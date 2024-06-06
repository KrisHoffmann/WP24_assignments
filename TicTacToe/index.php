<?php
include __DIR__ . '/tpl/head.php';
?>
<?php
include __DIR__ . '/tpl/body_start.php';
?><?php
include __DIR__ . '/tpl/background.php';
?>

<div id="selection-container">
    <form id="player-selection-form" action="game_screen.php" method="GET">
        <!-- Button for choosing to be player X -->
        <label>
            <input type="radio" name="player" value="X" required>
            Player 1 (X)
        </label>
        <br>
        <!-- Button for choosing to be player O -->
        <label>
            <input type="radio" name="player" value="O" required>
            Player 2 (O)
        </label>
        <br>
        <button type="submit">Start Game</button>
    </form>
</div>

<script src="scripts/script.js"></script>

<?php
include __DIR__ . '/tpl/body_end.php';
?>
<?php
include __DIR__ . '/tpl/footer.php';
?>
