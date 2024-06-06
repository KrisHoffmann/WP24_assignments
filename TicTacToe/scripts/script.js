let board = document.getElementById('board');
let message = document.getElementById('message');
let resetButton = document.getElementById('reset');
let turnDisplay = document.getElementById('turn');
let overlay = document.getElementById('overlay');
let playerXWins = document.getElementById('playerXWins');
let playerOWins = document.getElementById('playerOWins');
const urlParams = new URLSearchParams(window.location.search);
const player = urlParams.get('player');
let currentPlayer;
let gameOver = false;
let lastLoser = 'O'; // Default to 'O' so 'X' starts the first game
let hasWinner = false; // Flag to ensure the win count is updated only once

// sounds for winning, moving, drawing and losing
let moveSound = new Audio('sounds/move.mp3');
let winSound = new Audio('sounds/win.mp3');
let drawSound = new Audio('sounds/draw.mp3');
let loseSound = new Audio('sounds/lose.mp3');

if (!player || (player !== 'X' && player !== 'O')) {
    alert('Please provide a valid player in the URL, e.g., ?player=X or ?player=O');
    throw new Error('Invalid player');
}
// function for creating the board
function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', makeMove);
        board.appendChild(cell);
    }
    message.textContent = '';
    overlay.style.display = 'none';
    message.style.display = 'none';
    resetButton.style.display = 'none';
    gameOver = false;
    hasWinner = false; // Reset the flag for a new game
    fetchGameState();
}

function makeMove(event) {
    let cell = event.target;
    let index = cell.dataset.index;

    if (cell.textContent === '' && !message.textContent.includes('wins') && currentPlayer === player && !gameOver) {
        sendMove(index, player);
        moveSound.play();
    }
}

function sendMove(index, player) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'game.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            fetchGameState();
        }
    };
    xhr.send('index=' + index + '&player=' + player);
}

function fetchGameState() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'game.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            updateBoard(response.board);
            currentPlayer = response.currentPlayer;
            turnDisplay.textContent = currentPlayer === 'X' ? 'Player 1\'s turn (X)' : 'Player 2\'s turn (O)';

            if (!gameOver) {
                if (response.winner && !hasWinner) { // checking for a winner
                    hasWinner = true; // preventing more points to be added
                    if (response.winner === 'X') {
                        playerXWins.textContent = parseInt(playerXWins.textContent) + 1;
                        lastLoser = 'O'; // player O lost
                    } else if (response.winner === 'O') {
                        playerOWins.textContent = parseInt(playerOWins.textContent) + 1;
                        lastLoser = 'X'; // player X lost
                    }
                    let winningCells = getWinningCells(response.board, response.winner);
                    highlightWinningCells(winningCells);
                    setTimeout(function() {
                        message.textContent = 'Player ' + response.winner + ' wins!';
                        overlay.style.display = 'block';
                        message.style.display = 'block';
                        winSound.play();
                        setTimeout(hideMessage, 2000);
                        resetButton.style.display = 'block';
                        gameOver = true;
                        setTimeout(resetGame, 2000);
                    }, winningCells.length * 500); // wait for all cells to be highlighted
                } else if (response.draw && !gameOver) {
                    message.textContent = 'It\'s a draw!';
                    overlay.style.display = 'block';
                    message.style.display = 'block';
                    drawSound.play();
                    setTimeout(hideMessage, 2000);
                    resetButton.style.display = 'block';
                    gameOver = true;
                    setTimeout(resetGame, 2000);
                } else {
                    resetButton.style.display = 'block'; // Displaying the reset button at all times
                }
            }
        }
    };
    xhr.send();
}

function getWinningCells(board, winner) {
    let winningCells = [];
    // Define the winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]  // diagonals
    ];

    // Find the winning combination
    for (const combination of winningCombinations) {
        if (board[combination[0]] === winner && board[combination[1]] === winner && board[combination[2]] === winner) {
            winningCells = combination;
            break;
        }
    }
    return winningCells;
}

function highlightWinningCells(cells) {
    let delay = 0;
    cells.forEach((cellIndex) => {
        setTimeout(function() {
            let cell = document.querySelector(`[data-index="${cellIndex}"]`);
            cell.style.backgroundColor = 'green';
        }, delay);
        delay += 500; // add 500ms delay between each cell that gets chosen by the player
    });
}

function updateBoard(boardState) {
    let cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = boardState[index];
    });
}

function resetGame() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'game.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            createBoard();
        }
    };
    xhr.send('reset=true&startPlayer=' + lastLoser);
}

function hideMessage() {
    overlay.style.display = 'none';
    message.style.display = 'none';
}

resetButton.addEventListener('click', resetGame);
createBoard();
setInterval(fetchGameState, 1000);
