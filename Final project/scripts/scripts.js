const rouletteTableData = [
    { color: 'green', number: 0 },
    { color: 'black', number: 32 },
    { color: 'red', number: 15 },
    { color: 'black', number: 19 },
    { color: 'red', number: 4 },
    { color: 'black', number: 21 },
    { color: 'red', number: 2 },
    { color: 'black', number: 25 },
    { color: 'red', number: 17 },
    { color: 'black', number: 34 },
    { color: 'red', number: 6 },
    { color: 'black', number: 27 },
    { color: 'red', number: 13 },
    { color: 'black', number: 36 },
    { color: 'red', number: 11 },
    { color: 'black', number: 30 },
    { color: 'red', number: 8 },
    { color: 'black', number: 23 },
    { color: 'red', number: 10 },
    { color: 'black', number: 5 },
    { color: 'red', number: 24 },
    { color: 'black', number: 16 },
    { color: 'red', number: 33 },
    { color: 'black', number: 1 },
    { color: 'red', number: 20 },
    { color: 'black', number: 14 },
    { color: 'red', number: 31 },
    { color: 'black', number: 9 },
    { color: 'red', number: 22 },
    { color: 'black', number: 18 },
    { color: 'red', number: 29 },
    { color: 'black', number: 7 },
    { color: 'red', number: 28 },
    { color: 'black', number: 12 },
    { color: 'red', number: 35 },
    { color: 'black', number: 3 },
];

let player1Bet = 0;
let player1Number = 0;
let player2Bet = 0;
let player2Number = 0;
let chipsTallyPlayer1 = 100;
let chipsTallyPlayer2 = 100;

function generateRouletteTable() {
    const table = document.getElementById('roulette-table');
    const tbody = document.createElement('tbody');

    rouletteTableData.forEach((slot) => {
        const tr = document.createElement('tr');
        const tdColor = document.createElement('td');
        const tdNumber = document.createElement('td');

        tdColor.style.backgroundColor = slot.color;
        tdNumber.textContent = slot.number;

        // Add click event listener to each table cell
        tr.addEventListener('click', () => {
            // Set the selected number to the respective player's input field
            const player1NumberInput = document.getElementById('player1-number');
            const player2NumberInput = document.getElementById('player2-number');

            if (player1NumberInput.value === '0') {
                player1NumberInput.value = slot.number;
                tdNumber.style.backgroundColor = 'yellow';
            } else if (player2NumberInput.value === '0') {
                player2NumberInput.value = slot.number;
                tdNumber.style.backgroundColor = 'cyan';
            }
        });

        tr.appendChild(tdColor);
        tr.appendChild(tdNumber);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}

document.addEventListener('DOMContentLoaded', () => {
    generateRouletteTable();

    const player1BetForm = document.getElementById('player1-bet-form');
    const player2BetForm = document.getElementById('player2-bet-form');
    const spinButton = document.getElementById('spin-button');
    const resultArea = document.getElementById('result-area');
    const resultAreaPlayer1 = document.getElementById('result-area-player1');
    const resultAreaPlayer2 = document.getElementById('result-area-player2');

    player1BetForm.addEventListener('submit', (event) => {
        event.preventDefault();

        player1Bet = parseInt(document.getElementById('player1-bet').value);
        player1Number = parseInt(document.getElementById('player1-number').value);
    });

    player2BetForm.addEventListener('submit', (event) => {
        event.preventDefault();

        player2Bet = parseInt(document.getElementById('player2-bet').value);
        player2Number = parseInt(document.getElementById('player2-number').value);
    });

    spinButton.addEventListener('click', () => {
        const winningNumber = Math.floor(Math.random() * 37);

        resultArea.textContent = `Winning number: ${winningNumber}!`;

        if (winningNumber === player1Number && winningNumber === player2Number) {
            chipsTallyPlayer1 += player1Bet * 35;
            chipsTallyPlayer2 += player2Bet * 35;
            resultArea.style.backgroundColor = 'green';
            resultArea.textContent = `Both players win ${player1Bet * 35} chips! Player 1 tally: ${chipsTallyPlayer1}, Player 2 tally: ${chipsTallyPlayer2} `;
            resultAreaPlayer1.textContent = `Player 1 tally: ${chipsTallyPlayer1}`;
            resultAreaPlayer2.textContent = `Player 2 tally: ${chipsTallyPlayer2}`;
        } else if (winningNumber === player1Number) {
            chipsTallyPlayer1 += player1Bet * 35;
            resultArea.style.backgroundColor = 'green';
            resultArea.textContent = `Player 1 wins! ${player1Bet * 35} chips. Player 1 tally: ${chipsTallyPlayer1}`;
            resultAreaPlayer1.textContent = `Player 1 tally: ${chipsTallyPlayer1}`;
            resultAreaPlayer2.textContent = `Player 2 tally: ${chipsTallyPlayer2}`;
        } else if (winningNumber === player2Number) {
            chipsTallyPlayer2 += player2Bet * 35;
            resultArea.style.backgroundColor = 'green';
            resultArea.textContent = `Player 2 wins! ${player2Bet * 35} chips. Player 2 tally: ${chipsTallyPlayer2}`;
            resultAreaPlayer1.textContent = `Player 1 tally: ${chipsTallyPlayer1}`;
            resultAreaPlayer2.textContent = `Player 2 tally: ${chipsTallyPlayer2}`;
        } else {
            chipsTallyPlayer1 -= player1Bet;
            chipsTallyPlayer2 -= player2Bet;
            resultArea.textContent += ` No winner!`;
            resultArea.style.backgroundColor = 'white';
            resultAreaPlayer1.textContent = `Player 1 tally: ${chipsTallyPlayer1}`;
            resultAreaPlayer1.style.backgroundColor = 'white';
            resultAreaPlayer2.textContent = `Player 2 tally: ${chipsTallyPlayer2}`;
            resultAreaPlayer2.style.backgroundColor = 'white';
        }
    });

    const deletePlayer1BetButton = document.getElementById('delete-player1-bet');
    const deletePlayer2BetButton = document.getElementById('delete-player2-bet');

    deletePlayer1BetButton.addEventListener('click', () => {
        document.getElementById('player1-bet').value = '0';
        document.getElementById('player1-number').value = '0';
        player1Bet = 0;
        player1Number = 0;
        // Switch the background color of yellow tdNumber cells back to white
        document.querySelectorAll('#roulette-table td:nth-child(2)').forEach(td => {
            if (td.style.backgroundColor === 'yellow') {
                td.style.backgroundColor = 'white';
            }
        });
    });

    deletePlayer2BetButton.addEventListener('click', () => {
        document.getElementById('player2-bet').value = '0';
        document.getElementById('player2-number').value = '0';
        player2Bet = 0;
        player2Number = 0;
        // Switch the background color of cyan tdNumber cells back to white
        document.querySelectorAll('#roulette-table td:nth-child(2)').forEach(td => {
            if (td.style.backgroundColor === 'cyan') {
                td.style.backgroundColor = 'white';
            }
        });
    })
});
