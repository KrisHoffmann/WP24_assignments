<?php
$id = $_GET['id'];

$articles = json_decode(file_get_contents(__DIR__ . '/../data/articles.json'), true);

$key = array_search($id, array_column($articles, 'id'));

array_splice($articles, $key, 1);

file_put_contents(__DIR__ . '/../data/articles.json', json_encode($articles));