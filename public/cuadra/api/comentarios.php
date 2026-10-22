<?php
/**
 * Cuadra — recepción de comentarios desde la app.
 *
 * Se publica con la web (public/ → dist/ → public_html) en /cuadra/api/comentarios.php.
 * Recibe un JSON por POST y lo reenvía por correo a FEEDBACK_TO.
 * No guarda los mensajes: solo un contador temporal por IP (cifrada con hash)
 * para limitar envíos, que se borra solo al pasar una hora.
 */

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
$file = sys_get_temp_dir() . '/cuadra-fb-' . hash('sha256', $ip . __FILE__) . '.json';
$now  = time();
$hits = is_file($file) ? (json_decode((string)@file_get_contents($file), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn($t) => $t > $now - 3600));
if (count($hits) >= MAX_PER_HOUR) reply(429, ['ok' => false, 'error' => 'rate']);
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);

// Correo
$subject = '=?UTF-8?B?' . base64_encode('Comentario sobre Cuadra' . ($version ? " $version" : '')) . '?=';
$body = $message . "\n\n—\n"
      . 'Cuadra ' . ($version ?: '?') . ' · ' . ($platform ?: '?') . "\n"
      . 'Respuesta a: ' . ($email ?: '(no indicado)') . "\n";
$headers = [
    'From: Cuadra <' . MAIL_FROM . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if ($email !== '') $headers[] = 'Reply-To: ' . $email;

// -f: remitente del sobre; Hostinger rechaza el envío si no es un buzón del dominio
$sent = mail(FEEDBACK_TO, $subject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);
if (!$sent) error_log('Cuadra comentarios: mail() ha fallado: ' . (error_get_last()['message'] ?? 'sin detalle'));
reply($sent ? 200 : 502, ['ok' => $sent]);
