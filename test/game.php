<?php
session_start();

// Store moves in a session
if (!isset($_SESSION['moves'])) {
    $_SESSION['moves'] = array();
}

// Get move from client
$move = $_POST['move'];

// Store move in session
$_SESSION['moves'][] = $move;

// Check if both players have made their moves
if (count($_SESSION['moves']) == 2) {
    // Determine winner
    $moves = $_SESSION['moves'];
    $winner = determineWinner($moves[0], $moves[1]);

    // Display winner
    echo "Winner: ". $winner;
    unset($_SESSION['moves']); // Reset session
} else {
    echo "Waiting for other player to make their move...";
}

// Function to determine winner
function determineWinner($move1, $move2) {
    if ($move1 == $move2) {
        return "It's a tie!";
    } elseif ($move1 == 'rock' && $move2 == 'cissors') {
        return "Player 1 wins!";
    } elseif ($move1 == 'cissors' && $move2 == 'paper') {
        return "Player 1 wins!";
    } elseif ($move1 == 'paper' && $move2 == 'rock') {
        return "Player 1 wins!";
    } else {
        return "Player 2 wins!";
    }
}
?>