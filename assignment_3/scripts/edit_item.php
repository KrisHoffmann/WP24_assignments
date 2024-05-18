<?php
$json_data = json_decode(file_get_contents(__DIR__ . '/data/articles.json'), true);

$id = $_POST['id'];
$timestamp = $_POST['timestamp'];
$title = $_POST['title'];
$content = $_POST['content'];

foreach ($json_data as &$item) {
    if ($item['timestamp'] == $timestamp) {
        $item['title'] = $title;
        $item['content'] = $content;
        break;
    }
}

file_put_contents(__DIR__ . '/data/articles.json', json_encode($json_data));

echo json_encode(['message' => 'News item updated successfully']);