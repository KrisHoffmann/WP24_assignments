<?php
session_start();

$filename = 'data/game_state.json';

// resetting the game if reset button is clicked
if (isset($_POST['reset'])) {
    $startPlayer = $_POST['startPlayer'] ?? 'X'; // default starting player to 'X' if not provided
    resetGameState($filename, $startPlayer);
    echo json_encode(['status' => 'reset']);
    exit;
}
// handling moves made by players
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['index']) && isset($_POST['player'])) {
    $index = $_POST['index'];
    $player = $_POST['player'];

    $gameState = getGameState($filename);
    // checking if the cell is empty and if it is the turn of the current player
    if ($gameState['board'][$index] === '' && $gameState['currentPlayer'] === $player) {
        $gameState['board'][$index] = $player;
        $gameState = checkGameState($gameState, $player);
        $gameState['currentPlayer'] = $player === 'X' ? 'O' : 'X';
        saveGameState($filename, $gameState);
        echo json_encode($gameState);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $gameState = getGameState($filename);
    echo json_encode($gameState);
}
// retrieving game state
function getGameState($filename) {
    if (!file_exists($filename)) {
        resetGameState($filename, 'X');
    }
    return json_decode(file_get_contents($filename), true);
}

function saveGameState($filename, $gameState) {
    file_put_contents($filename, json_encode($gameState));
}

// function to reset game state
function resetGameState($filename, $startPlayer) {
    $initialState = [
        'board' => array_fill(0, 9, ''),
        'winner' => null,
        'draw' => false,
        'currentPlayer' => $startPlayer
    ];
    saveGameState($filename, $initialState);
}
// function to check if theres a winner or if its a draw
function checkGameState($gameState, $player) {
    if (checkWinner($gameState['board'], $player)) {
        $gameState['winner'] = $player;
    } elseif (checkDraw($gameState['board'])) {
        $gameState['draw'] = true;
    }
    return $gameState;
}

// checking for winning combination
function checkWinner($board, $player) {
    $winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]  // diagonals
    ];

    foreach ($winningCombinations as $combination) {
        if ($board[$combination[0]] === $player &&
            $board[$combination[1]] === $player &&
            $board[$combination[2]] === $player) {
            return true;
        }
    }

    return false;
}

// function to check if the game is a draw
function checkDraw($board) {
    foreach ($board as $cell) {
        if ($cell === '') {
            return false;
        }
    }

    return true;
}
?>