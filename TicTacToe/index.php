<?php
include __DIR__ . '/tpl/head.php';
?>
<body>
<p>You can play a game of Tic Tac Toe. Please wait before your turn!</p>
<div id="board"></div>
<div id="overlay"></div>
<div id="message"></div>
<div id="turn"></div>
<div id="overlay"></div>
<p>Player X Wins: <span id="playerXWins">0</span></p>
<p>Player O Wins: <span id="playerOWins">0</span></p>
<button id="reset">Reset Game</button>
<button id="reset">Reset Game</button>

<script src="scripts/script.js"></script>

<?php
include __DIR__ . '/tpl/body_end.php';
?>