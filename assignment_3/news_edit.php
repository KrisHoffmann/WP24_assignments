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

<form id="edit-form">
    <input type="hidden" id="id" name="id" required>
    <label for="timestamp">Timestamp:</label>
    <input type="text" id="timestamp" name="timestamp" required>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required>
    <label for="content">Content:</label>
    <textarea id="content" name="content" required></textarea>
    <button type="submit">Update news item</button>
</form>

<script>
    var data = JSON.parse('<?php echo $_GET["data"]; ?>');

    document.getElementById("id").value = data.id;
    document.getElementById("timestamp").value = data.timestamp;
    document.getElementById("title").value = data.title;
    document.getElementById("content").value = data.content;

    document.getElementById("edit-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var data = {
            id: document.getElementById("id").value,
            timestamp: parseInt(document.getElementById("timestamp").value),
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
        };

        fetch("scripts/edit_item.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                console.log("News item updated successfully");
                document.getElementById("edit-form").reset();
            })
            .catch(function(error) {
                console.error("Error updating news item:", error);
            });
    });
</script>