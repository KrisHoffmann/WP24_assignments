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

<form id="add-form">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required>
    <label for="content">Content:</label>
    <textarea id="content" name="content" required></textarea>
    <button type="submit">Add news item</button>
</form>

<script>
    document.getElementById("add-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var data = {
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
        };

        fetch("scripts/add_item.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        document.getElementById("add-form").reset();
    });
</script>