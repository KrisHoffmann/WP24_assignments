<?php
/* Header */
$page_title = 'Webprogramming Assignment 2 - Future';
$navigation = Array(
    'active' => 'Future',
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
        <h1>Future</h1>
        <ul>
            <li>learning more about how to use php</li>
            <li>trying to figure this out more </li>
            <li>implement new fun things into the sites as the assignments require </li>
        </ul>
    </div>
<?php
include __DIR__ . '/tpl/body-end.php';
/* Footer */
include __DIR__ . '/tpl/footer.php';
?>