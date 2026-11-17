<?php
/**
 * Zenit (antes Cuadra) — recepción de comentarios desde la app.
 * La ruta /cuadra/api/ y cuadra-config.php se mantienen: la app instalada envía aquí.
 *
 * Se publica con la web (public/ → dist/ → public_html) en /cuadra/api/comentarios.php.
 * Recibe un JSON por POST y lo reenvía por correo a FEEDBACK_TO.
 * No guarda los mensajes: solo un contador temporal por IP (cifrada con hash)
 * más uno global para limitar envíos; las marcas caducan al pasar una hora.
 *
 * Envío por SMTP autenticado. La contraseña NO está en el repositorio: se lee de
 * domains/xyfos.com/cuadra-config.php (fuera de public_html), que solo existe en el servidor:
 *
 *   <?php return ['smtp_password' => '...'];
 *
 * Si ese archivo no existe se intenta con mail().
 */

const SMTP_HOST = 'ssl://smtp.hostinger.com';
const SMTP_PORT = 465;
const CONFIG_FILE = __DIR__ . '/../../../cuadra-config.php'; // public_html/cuadra/api → domains/xyfos.com

const FEEDBACK_TO   = 'cuadra@xyfos.com';
const MAIL_FROM     = 'no-reply@xyfos.com';   // debe ser del dominio (SPF/DKIM)
const MAX_MESSAGE   = 3000;                   // caracteres
const MAX_PER_HOUR  = 5;                      // envíos por IP y hora
const MAX_GLOBAL_PER_HOUR = 50;               // envíos totales por hora (frena IPs rotativas)
const MAX_BODY      = 16384;                  // bytes del JSON recibido
const RATE_DIR      = __DIR__ . '/../../../cuadra-ratelimit'; // fuera de public_html; si no se puede crear, se usa el temporal
const ALLOWED_ORIGINS = [
    'http://tauri.localhost',                 // app Android y Windows
    'https://tauri.localhost',
    'tauri://localhost',                      // macOS / Linux
];

header('Content-Type: application/json; charset=utf-8');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

/** Cliente SMTP mínimo (SSL implícito + AUTH LOGIN). Devuelve true si el servidor acepta el mensaje. */
function smtp_send(string $to, string $subject, string $body, array $headers, string $password): bool {
    $fp = @stream_socket_client(SMTP_HOST . ':' . SMTP_PORT, $errno, $errstr, 15);
    if (!$fp) { error_log("Zenit comentarios: SMTP sin conexión: $errstr"); return false; }
    stream_set_timeout($fp, 15);

    $read = function () use ($fp) {
        $out = '';
        while (($line = fgets($fp, 515)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break; // última línea de la respuesta
        }
        return $out;
    };
    $cmd = function (?string $line, int $expect) use ($fp, $read) {
        if ($line !== null) fwrite($fp, $line . "\r\n");
        $res = $read();
        if ((int)substr($res, 0, 3) !== $expect) throw new RuntimeException(trim($res));
    };

    try {
        $cmd(null, 220);
        $cmd('EHLO xyfos.com', 250);
        $cmd('AUTH LOGIN', 334);
        $cmd(base64_encode(MAIL_FROM), 334);
        $cmd(base64_encode($password), 235);
        $cmd('MAIL FROM:<' . MAIL_FROM . '>', 250);
        $cmd("RCPT TO:<$to>", 250);
        $cmd('DATA', 354);
        $msg = implode("\r\n", array_merge($headers, [
            "To: $to",
            "Subject: $subject",
            'Date: ' . date('r'),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@xyfos.com>',
            'MIME-Version: 1.0',
        ])) . "\r\n\r\n" . preg_replace('/^\./m', '..', preg_replace('/\r\n|\r|\n/', "\r\n", $body));
        $cmd($msg . "\r\n.", 250);
        fwrite($fp, "QUIT\r\n");
        return true;
    } catch (Throwable $e) {
        error_log('Zenit comentarios: SMTP ha fallado: ' . $e->getMessage());
        return false;
    } finally {
        fclose($fp);
    }
}

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') reply(204, []);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);
if (!in_array($origin, ALLOWED_ORIGINS, true)) reply(403, ['ok' => false, 'error' => 'origin']);

if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY) reply(413, ['ok' => false, 'error' => 'size']);
$raw = file_get_contents('php://input', false, null, 0, MAX_BODY + 1) ?: '';
if (strlen($raw) > MAX_BODY) reply(413, ['ok' => false, 'error' => 'size']);
$data = json_decode($raw, true);
if (!is_array($data)) reply(400, ['ok' => false, 'error' => 'json']);

// Trampa para bots: campo oculto que una persona nunca rellena
if (!empty($data['website'])) reply(200, ['ok' => true]);

// Saltos de línea normalizados a \n y fuera el resto de caracteres de control (evita trucos con \r sueltos en SMTP)
$message  = (string)($data['message'] ?? '');
if (!mb_check_encoding($message, 'UTF-8')) reply(400, ['ok' => false, 'error' => 'message']);
$message  = trim(preg_replace('/[^\P{C}\n\t]/u', '', preg_replace('/\r\n|\r/', "\n", $message)));
$email    = trim((string)($data['email'] ?? ''));
$version  = substr(preg_replace('/[^\w.\- ]/u', '', (string)($data['version'] ?? '')), 0, 40);
$platform = substr(preg_replace('/[^\w.\- ]/u', '', (string)($data['platform'] ?? '')), 0, 40);

if ($message === '' || mb_strlen($message) > MAX_MESSAGE) reply(400, ['ok' => false, 'error' => 'message']);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(400, ['ok' => false, 'error' => 'email']);

// Límite de envíos por IP (hash, sin guardar la IP en claro) y global.
// IPv6 se cuenta por prefijo /64: un mismo usuario controla el bloque entero.
$ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bin = @inet_pton($ip);
$key = hash('sha256', ($bin !== false && strlen($bin) === 16 ? substr($bin, 0, 8) : $ip) . __FILE__);

$dir = (is_dir(RATE_DIR) || @mkdir(RATE_DIR, 0700)) && is_writable(RATE_DIR) ? RATE_DIR : sys_get_temp_dir();
// Un solo archivo con bloqueo exclusivo hasta el final: las peticiones simultáneas
// esperan su turno en vez de pasar todas la comprobación a la vez.
$lock = @fopen($dir . '/cuadra-fb3.json', 'c+');
if (!$lock || !flock($lock, LOCK_EX)) reply(503, ['ok' => false]);
$now   = time();
$state = json_decode((string)stream_get_contents($lock), true) ?: [];
foreach ($state as $k => $times) {
    $state[$k] = array_values(array_filter((array)$times, fn($t) => $t > $now - 3600));
    if (!$state[$k]) unset($state[$k]);
}
if (count($state['global'] ?? []) >= MAX_GLOBAL_PER_HOUR
    || count($state[$key] ?? []) >= MAX_PER_HOUR) reply(429, ['ok' => false, 'error' => 'rate']);

// Correo
$subject = '=?UTF-8?B?' . base64_encode('Comentario sobre Zenit' . ($version ? " $version" : '')) . '?=';
$body = $message . "\n\n—\n"
      . 'Zenit ' . ($version ?: '?') . ' · ' . ($platform ?: '?') . "\n"
      . 'Respuesta a: ' . ($email ?: '(no indicado)') . "\n";
$headers = [
    'From: Zenit <' . MAIL_FROM . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if ($email !== '') $headers[] = 'Reply-To: ' . $email;

$config = is_file(CONFIG_FILE) ? (require CONFIG_FILE) : [];
if (!empty($config['smtp_password'])) {
    $sent = smtp_send(FEEDBACK_TO, $subject, $body, $headers, $config['smtp_password']);
} else {
    // -f: remitente del sobre; Hostinger rechaza el envío si no es un buzón del dominio
    $sent = mail(FEEDBACK_TO, $subject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);
    if (!$sent) error_log('Zenit comentarios: mail() ha fallado: ' . (error_get_last()['message'] ?? 'sin detalle'));
}
if (!$sent) reply(502, ['ok' => false]);

// Solo cuentan para el límite los envíos que salen bien
$state[$key][]     = $now;
$state['global'][] = $now;
ftruncate($lock, 0);
rewind($lock);
fwrite($lock, json_encode($state));
fflush($lock);
reply(200, ['ok' => true]); // exit libera el bloqueo
