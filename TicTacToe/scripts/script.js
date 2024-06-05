let board = document.getElementById('board');
let message = document.getElementById('message');
let resetButton = document.getElementById('reset');
let turnDisplay = document.getElementById('turn');
let overlay = document.getElementById('overlay');
const urlParams = new URLSearchParams(window.location.search);
const player = urlParams.get('player');
let currentPlayer;
let gameOver = false;

// Sound effects
let moveSound = new Audio('sounds/move.mp3');
let winSound = new Audio('sounds/win.mp3');
let drawSound = new Audio('sounds/draw.mp3');
let loseSound = new Audio('sounds/lose.mp3');


if (!player || (player !== 'X' && player !== 'O')) {
    alert('Please provide a valid player in the URL, e.g., ?player=X or ?player=O');
    throw new Error('Invalid player');
}

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
                if (response.winner) {
                    if (response.winner === 'X') {
                        playerXWins.textContent = parseInt(playerXWins.textContent) + 1;
                    } else if (response.winner === 'O') {
                        playerOWins.textContent = parseInt(playerOWins.textContent) + 1;
                    }
                    message.textContent = 'Player ' + response.winner + ' wins!';
                    overlay.style.display = 'block';
                    message.style.display = 'block';
                    winSound.play();
                    setTimeout(hideMessage, 2000);
                    resetButton.style.display = 'block';
                    gameOver = true;
                    setTimeout(resetGame, 2000);
                } else if (response.draw) {
                    message.textContent = 'It\'s a draw!';
                    overlay.style.display = 'block';
                    message.style.display = 'block';
                    drawSound.play();
                    setTimeout(hideMessage, 2000);
                    resetButton.style.display = 'block';
                    gameOver = true;
                    setTimeout(resetGame, 2000);
                } else {
                    resetButton.style.display = 'block'; // Always display the reset button
                }
            }
        }
    };
    xhr.send();
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
    xhr.send('reset=true');
}

function hideMessage() {
    overlay.style.display = 'none';
    message.style.display = 'none';
}

resetButton.addEventListener('click', resetGame);
createBoard();
setInterval(fetchGameState, 1000); // Poll the server every second