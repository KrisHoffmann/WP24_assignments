<?php
$data = json_decode(file_get_contents('php://input'), true);

$data['timestamp'] = time();

$formatted_timestamp = date('d-m-Y, H:i', $data['timestamp']);

$articles = json_decode(file_get_contents(__DIR__ . '/../data/articles.json'), true);
$articles[] = array_merge($data, ['timestamp_human' => $formatted_timestamp]);
file_put_contents(__DIR__ . '/../data/articles.json', json_encode($articles));