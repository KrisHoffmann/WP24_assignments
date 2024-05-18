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

<button id="remove-button" data-id="<?php echo $_GET['id']; ?>">Remove news item</button>

<script>
    var id = document.getElementById("remove-button").dataset.id;

    document.getElementById("remove-button").addEventListener("click", function(event) {
        event.preventDefault();

        fetch("scripts/news_remove.php?id=" + id);
    });
</script>