<?php
// Получаем заголовки и тело запроса
$headers = getallheaders();
$payload = file_get_contents("php://input");

// Проверяем сигнатуру HMAC с использованием секретного ключа
$secret = 'Pu11FromGtiN0\/\/';
$signature = 'sha1=' . hash_hmac('sha1', $payload, $secret);

// Проверяем, что это событие push и сигнатура совпадает
if ($headers['X-GitHub-Event'] === 'push' && $headers['X-Hub-Signature'] === $signature) {
    // Выполняем необходимые действия, например, обновление кода и перезапуск сервера
    // В данном примере, мы будет использовать команду git pull для обновления кода
    shell_exec('cd /var/www/kaizen/www/ && git pull');

    // Дополнительные действия, если это необходимо
    // ...

    // Отправляем ответ об успешном выполнении
    http_response_code(200);
    echo "Webhook processed successfully";
} else {
    // Отправляем ошибку, если сигнатура не совпадает
    http_response_code(401);
    echo "Invalid signature";
}