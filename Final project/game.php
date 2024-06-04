<?php
header("Content-Type: application/json");

// Get the player bets and chosen numbers from the POST data
$player1Bet = isset($_POST['player1-bet']) ? intval($_POST['player1-bet']) : 0;
$player1Number = isset($_POST['player1-number']) ? intval($_POST['player1-number']) : null;
$player2Bet = isset($_POST['player2-bet']) ? intval($_POST['player2-bet']) : 0;
$player2Number = isset($_POST['player2-number']) ? intval($_POST['player2-number']) : null;

// Simulate the roulette wheel spin
$winningNumber = rand(0, 36);

// Initialize winnings
$player1Winnings = -$player1Bet; // Default to losing their bet
$player2Winnings = -$player2Bet; // Default to losing their bet

// Calculate the player winnings
if ($winningNumber !== 0) {
    // Player 1 wins if their number matches the winning number
    if ($player1Bet > 0 && $player1Number === $winningNumber) {
        $player1Winnings = $player1Bet * 35;
    }

    // Player 2 wins if their number matches the winning number
    if ($player2Bet > 0 && $player2Number === $winningNumber) {
        $player2Winnings = $player2Bet * 35;
    }
}

// Send the response back to the client
echo json_encode([
    "player1Bet" => $player1Bet,
    "player1Number" => $player1Number,
    "player2Bet" => $player2Bet,
    "player2Number" => $player2Number,
    "winningNumber" => $winningNumber,
    "player1Winnings" => $player1Winnings,
    "player2Winnings" => $player2Winnings,
]);
?>
