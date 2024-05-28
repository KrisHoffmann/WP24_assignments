<?php
header("Content-Type: application/json");

// Get the player bets from the POST data
$player1Bet = isset($_POST['player1-bet']) ? intval($_POST['player1-bet']) : 0;
$player2Bet = isset($_POST['player2-bet']) ? intval($_POST['player2-bet']) : 0;

// Simulate the roulette wheel spin
$winningNumber = rand(0, 36);

// Calculate the player winnings
$player1Winnings = $player1Bet * 36;
$player2Winnings = $player2Bet * 36;

if ($winningNumber === 0) {
    // Green win, all bets lose their money
    $player1Winnings = -$player1Bet;
    $player2Winnings = -$player2Bet;
} else {
    // Player 1 wins if their number is higher than the winning number
    if ($player1Bet > $winningNumber) {
        $player1Winnings = $player1Bet * 35;
    }

    // Player 2 wins if their number is lower than the winning number
    if ($player2Bet < $winningNumber) {
        $player2Winnings = $player2Bet * 35;
    }
}

// Send the response back to the client
echo json_encode([
    "player1Bet" => $player1Bet,
    "player2Bet" => $player2Bet,
    "winningNumber" => $winningNumber,
    "player1Winnings" => $player1Winnings,
    "player2Winnings" => $player2Winnings,
]);
?>