<?php
/* Header */
$page_title = 'Webprogramming Assignment 2 - Home';
$navigation = Array(
    'active' => 'Home',
    'items' => Array(
        'Home' => '/WP24/assignment_2/index.php',
        'Links' => '/WP24/assignment_2/links.php',
        'News' => '/WP24/assignment_2/news.php',
        'Future' => '/WP24/assignment_2/future.php'
    )
);
include __DIR__ . '/tpl/head.php';
/* Body */
include __DIR__ . '/tpl/body-start.php';
?>
    <div class="col-md-12">
        <h1>Welcome to my site! with templates, for the first assignment with php</h1>
    </div>
<?php
include __DIR__ . '/tpl/body-end.php';
/* Footer */
include __DIR__ . '/tpl/footer.php';
?>