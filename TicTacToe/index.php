<?php
include __DIR__ . '/tpl/head.php';
?>
<body>
<p>You can play a game of Tic Tac Toe. Please wait before your turn!</p>
<div id="board"></div>
<div id="message"></div>
<div id="turn"></div>
<button id="reset">Reset Game</button>

<script>
    let board = document.getElementById('board');
    let message = document.getElementById('message');
    let resetButton = document.getElementById('reset');
    let turnDisplay = document.getElementById('turn');
    const urlParams = new URLSearchParams(window.location.search);
    const player = urlParams.get('player');

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
        fetchGameState();
    }

    function makeMove(event) {
        let cell = event.target;
        let index = cell.dataset.index;

        if (cell.textContent === '' && !message.textContent.includes('wins') && currentPlayer === player) {
            sendMove(index, player);
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

                if (response.winner) {
                    message.textContent = 'Player ' + response.winner + ' wins!';
                    resetButton.style.display = 'block';
                } else if (response.draw) {
                    message.textContent = 'It\'s a draw!';
                    resetButton.style.display = 'block';
                } else {
                    resetButton.style.display = 'block'; // Always display the reset button
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

    resetButton.addEventListener('click', resetGame);
    createBoard();
    setInterval(fetchGameState, 1000); // Poll the server every second
</script>

<?php
include __DIR__ . '/tpl/body_end.php';
?>