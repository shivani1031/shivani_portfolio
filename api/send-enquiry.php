<?php
// Emails contact form enquiries. Recipient comes from api/mail-config.php.
header('Content-Type: application/json');
function reply($code, $ok, $msg) { http_response_code($code); echo json_encode(['ok' => $ok, 'message' => $msg]); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, false, 'Method not allowed.');
if (!empty($_POST['company_website'])) reply(200, true, 'Thanks, your message has been sent.');

$clean = function ($k, $max) { return trim(mb_substr(str_replace(["\r", "\n"], ' ', (string)($_POST[$k] ?? '')), 0, $max)); };
$name = $clean('name', 100);
$email = $clean('email', 150);
$phone = $clean('phone', 40);
$service = $clean('service', 80);
$message = trim(mb_substr((string)($_POST['message'] ?? ''), 0, 4000));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(422, false, 'Please add your name, a valid email and a message.');

$configFile = __DIR__ . '/mail-config.php';
$config = is_file($configFile) ? include $configFile : [];
if (empty($config['mail_to'])) reply(500, false, 'The form is not set up yet.');

$from = $config['mail_from'] ?? $config['mail_to'];
$headers = "From: Portfolio <$from>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$body = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\n\n$message\n";
if (!mail($config['mail_to'], "Portfolio enquiry from $name", $body, $headers)) reply(500, false, 'The message could not be sent.');
reply(200, true, 'Thanks, your message has been sent.');
