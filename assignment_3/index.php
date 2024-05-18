<?php
$page_title = 'Webprogramming Assignment 3 - Leap Year';
$navigation = Array(
    'active' => 'Leap Year',
    'items' => Array(
        'News' => '/WP24/assignment_3/index.php',
        'Add news item' => '/WP24/assignment_3/news_add.php',
        'edit' => '/WP24/assignment_3/news_edit.php',
        'remove' => '/WP24/assignment_3/news_remove.php',
        'Simple Form' => '/WP24/assignment_3/simple_form.php',
        'Leap Year' => '/WP24/assignment_3/leapyear.php'
    )
);
include __DIR__ . '/tpl/head.php';
include __DIR__ . '/tpl/body_start.php';
?>

<?php
include 'scripts/read_latest_news.php';
echo "<table>";
echo "<thead>";
echo "<tr>";
echo "<th>Title</th>";
echo "<th>Content</th>";
echo "<th>News date</th>";
echo "<th>Unique timestamp for editing</th>";
echo "</tr>";
echo "</thead>";
echo "<tbody>";
foreach ($articles as $article) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($article['title']) . "</td>";
    echo "<td>" . htmlspecialchars($article['content']) . "</td>";
    echo "<td>" . htmlspecialchars($article['timestamp_human']) . "</td>";
    echo "<td>" . htmlspecialchars($article['timestamp']) . "</td>";
    echo "</tr>";
}
echo "</tbody>";
echo "</table>";

include __DIR__ . '/tpl/body_end.php';
?>