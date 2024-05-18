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
$name = '';
$age = '';
$mail = '';
$place = '';
$errors = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
        $errors[] = "Name is required";
    } else {
        $name = test_input($_POST["name"]);
    }

    if (empty($_POST["age"])) {
        $errors[] = "Age is required";
    } else {
        $age = test_input($_POST["age"]);
    }

    if (empty($_POST["mail"])) {
        $errors[] = "Mail address is required";
    } else {
        $mail = test_input($_POST["mail"]);
    }

    if (empty($_POST["place"])) {
        $errors[] = "Place of residence is required";
    } else {
        $place = test_input($_POST["place"]);
    }

    if (empty($errors)) {
        $leap_years = array();
        $current_year = date("Y");
        for ($i = 1; $i <= 5; $i++) {
            $leap_year = $current_year + (4 * $i) - (($i - 1) % 4);
            $leap_years[] = $leap_year;
        }

        echo "<h1>Welcome $name!</h1>";
        echo "<p> The next 5 leap years,this will be your age!</p>";
        echo "<p>Nice, You're living in $place!</p>";

        echo "<table class='table'>";
        echo "<thead><tr><th>Leap Year</th><th>Age</th></tr></thead>";
        echo "<tbody>";
        foreach ($leap_years as $leap_year) {
            $age_in_leap_year = $age + (($leap_year - $current_year) - 1);
            echo "<tr><td>$leap_year</td><td>$age_in_leap_year</td></tr>";
        }
        echo "</tbody>";
        echo "</table>";

        $name = '';
        $age = '';
        $mail = '';
        $place = '';
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>


<div class="container">
    <div class="row">
        <div class="col-md-12">
            <form action="<?php echo $_SERVER["PHP_SELF"];?>" method="post">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" id="name" name="name" value="<?php echo $name; ?>">
                    <?php if (!empty($errors) && in_array("Name is required", $errors)): ?>
                        <div class="invalid-feedback">Name is required</div>
                    <?php endif; ?>
                    <?php if (!empty($errors) && in_array("Only letters and white space allowed", $errors)): ?>
                        <div class="invalid-feedback">Only letters and white space allowed</div>
                    <?php endif; ?>
                </div>
                <div class="form-group">
                    <label for="age">Age:</label>
                    <input type="number" class="form-control" id="age" name="age" value="<?php echo $age; ?>">
                    <?php if (!empty($errors) && in_array("Age is required", $errors)): ?>
                        <div class="invalid-feedback">Age is required</div>
                    <?php endif; ?>
                    <?php if (!empty($errors) && in_array("Only numbers allowed", $errors)): ?>
                        <div class="invalid-feedback">Only numbers allowed</div>
                    <?php endif; ?>
                </div>
                <div class="form-group">
                    <label for="mail">Mail address:</label>
                    <input type="email" class="form-control" id="mail" name="mail" value="<?php echo $mail; ?>">
                    <?php if (!empty($errors) && in_array("Mail address is required", $errors)): ?>
                        <div class="invalid-feedback">Mail address is required</div>
                    <?php endif; ?>
                    <?php if (!empty($errors) && in_array("Invalid mail address", $errors)): ?>
                        <div class="invalid-feedback">Invalid mail address</div>
                    <?php endif; ?>
                </div>
                <div class="form-group">
                    <label for="place">Place/Residence:</label>
                    <input type="text" class="form-control" id="place" name="place" value="<?php echo $place; ?>">
                    <?php if (!empty($errors) && in_array("Place of residence is required", $errors)): ?>
                        <div class="invalid-feedback">Place of residence is required</div>
                    <?php endif; ?>
                    <?php if (!empty($errors) && in_array("Only letters and white space allowed", $errors)): ?>
                        <div class="invalid-feedback">Only letters and white space allowed</div>
                    <?php endif; ?>
                </div>
                <button type="submit" class="btn btn-primary">Show me!</button>
            </form>
        </div>
    </div>
</div>

<?php
include __DIR__ . '/tpl/body_end.php';
?>

<script src="scripts/leapyear.js"></script>