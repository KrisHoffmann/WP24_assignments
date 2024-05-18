<?php
$articles = file_get_contents(__DIR__ . '/../data/articles.json');
$articles = json_decode($articles, true);

usort($articles, function($a, $b) {
    return strtotime($b['timestamp_human']) - strtotime($a['timestamp_human']);
});

$articles = array_slice($articles, 0, 5);
?>