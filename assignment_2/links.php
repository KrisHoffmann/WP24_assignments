<?php
/* Header */
$page_title = 'Webprogramming Assignment 2 - Links';
$navigation = Array(
    'active' => 'Links',
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
        <h1>Some basic links to get started</h1>
        <ul>
            <li><a href="https://www.google.com/">Google</a></li>
            <li><a href="https://www.wikipedia.org/">Wikipedia</a></li>
            <li><a href="https://www.youtube.com/">Youtube</a></li>
        </ul>
    </div>
    <button id="toggle-links-btn">Toggle Links</button>
    <ul id="links-list"></ul>

    <input id="link-name" type="text" placeholder="Link Name">
    <input id="link-url" type="text" placeholder="Link URL">
    <button id="add-link-btn">Add Link</button>

    <button id="delete-mode-btn">Toggle Delete Mode</button>
<?php
include __DIR__ . '/tpl/body-end.php';
/* Footer */
include __DIR__ . '/tpl/footer.php';
?>