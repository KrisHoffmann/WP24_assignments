<?php
include __DIR__ . '/tpl/head.php';
?>
<?php
include __DIR__ . '/tpl/body_start.php';
?><?php
include __DIR__ . '/tpl/background.php';
?>
    <div id="game-container">
        <div id="game">
            <p>You can play a game of Tic Tac Toe. Please wait before your turn!</p>
            <div id="turn"></div>
            <div id="board"></div>
            <div id="scoreboard">
                <p>Player X Wins: <span id="playerXWins">0</span></p>
                <p>Player O Wins: <span id="playerOWins">0</span></p>
                <button id="reset">Reset Game</button>
            </div>
            <div id="overlay"></div>
            <div id="message"></div>
        </div>
    </div>
    <div id="overlay"></div>
    <div id="message"></div>

<script src="scripts/script.js"></script>

<?php
include __DIR__ . '/tpl/body_end.php';
?>
<?php
include __DIR__ . '/tpl/footer.php';
?>
