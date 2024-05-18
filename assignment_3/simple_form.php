<?php
$name = '';
$place = '';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $name = $_GET["name"];
    $place = $_GET["place"];
}

$page_title = 'Webprogramming Assignment 3 - Leap Year';
$navigation = array(
    'active' => 'Leap Year',
    'items' => array(
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


    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <form action="<?php echo $_SERVER["PHP_SELF"];?>" method="get">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" id="name" name="name">
                    </div>
                    <div class="form-group">
                        <label for="place">Place/Residence:</label>
                        <input type="text" class="form-control" id="place" name="place">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        <?php if (!empty($name)): ?>
            <h1>Welcome <?php echo $name; ?>!</h1>
        <?php endif; ?>
        <?php if ($place == "Amsterdam"): ?>
            <p>You're from the capital of the Netherlands!</p>
        <?php elseif (!empty($place)): ?>
            <p>You're from <?php echo $place; ?>!</p>
        <?php endif; ?>
    </div>

<?php
include __DIR__ . '/tpl/body_end.php';
?>