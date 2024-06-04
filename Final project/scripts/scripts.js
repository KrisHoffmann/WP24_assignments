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

        if (winningNumber === player1Number) {
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
});
