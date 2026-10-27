<?php
/**
 * Zenit (antes Cuadra) — recepción de comentarios desde la app.
 * La ruta /cuadra/api/ y cuadra-config.php se mantienen: la app instalada envía aquí.
 *
 * Se publica con la web (public/ → dist/ → public_html) en /cuadra/api/comentarios.php.
 * Recibe un JSON por POST y lo reenvía por correo a FEEDBACK_TO.
 * No guarda los mensajes: solo un contador temporal por IP (cifrada con hash)
 * para limitar envíos, que se borra solo al pasar una hora.
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
        ])) . "\r\n\r\n" . preg_replace('/^\./m', '..', str_replace(["\r\n", "\n"], "\r\n", $body));
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

$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) reply(400, ['ok' => false, 'error' => 'json']);

// Trampa para bots: campo oculto que una persona nunca rellena
if (!empty($data['website'])) reply(200, ['ok' => true]);

$message  = trim((string)($data['message'] ?? ''));
$email    = trim((string)($data['email'] ?? ''));
$version  = substr(preg_replace('/[^\w.\- ]/u', '', (string)($data['version'] ?? '')), 0, 40);
$platform = substr(preg_replace('/[^\w.\- ]/u', '', (string)($data['platform'] ?? '')), 0, 40);

if ($message === '' || mb_strlen($message) > MAX_MESSAGE) reply(400, ['ok' => false, 'error' => 'message']);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(400, ['ok' => false, 'error' => 'email']);

// Límite de envíos por IP (hash, sin guardar la IP en claro)
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$file = sys_get_temp_dir() . '/cuadra-fb2-' . hash('sha256', $ip . __FILE__) . '.json';
$now  = time();
$hits = is_file($file) ? (json_decode((string)@file_get_contents($file), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn($t) => $t > $now - 3600));
if (count($hits) >= MAX_PER_HOUR) reply(429, ['ok' => false, 'error' => 'rate']);

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
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);
reply(200, ['ok' => true]);
