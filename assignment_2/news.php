<?php
/* Header */
$page_title = 'Webprogramming Assignment 2 - News';
$navigation = Array(
    'active' => 'News',
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
        <h1>News</h1>
        <ul>
            <li>something the weather today has been nice</li>
            <li>i am excited for summer break </li>
            <li> finished my previous bachelor degree last week </li>
        </ul>
    </div>
<?php
include __DIR__ . '/tpl/body-end.php';
/* Footer */
include __DIR__ . '/tpl/footer.php';
?>