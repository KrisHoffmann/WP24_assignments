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

let player1Bets = [];
let player2Bets = [];
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

function displayBets() {
    const player1BetList = document.getElementById('player1-bet-list');
    const player2BetList = document.getElementById('player2-bet-list');

    player1BetList.innerHTML = '';
    player1Bets.forEach(bet => {
        const betDiv = document.createElement('div');
        betDiv.textContent = `Bet: ${bet.amount}, Number: ${bet.number}`;
        player1BetList.appendChild(betDiv);
    });

    player2BetList.innerHTML = '';
    player2Bets.forEach(bet => {
        const betDiv = document.createElement('div');
        betDiv.textContent = `Bet: ${bet.amount}, Number: ${bet.number}`;
        player2BetList.appendChild(betDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateRouletteTable();

    const player1BetForm = document.getElementById('player1-bet-form');
    const player2BetForm = document.getElementById('player2-bet-form');
    const spinButton = document.getElementById('spin-button');
    const resultArea = document.getElementById('result-area');
    const resultAreaPlayer1 = document.getElementById('result-area-player1');
    const resultAreaPlayer2 = document.getElementById('result-area-player2');

    // Event listener for submitting player 1 bet form
    player1BetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = parseInt(document.getElementById('player1-bet').value);
        const number = parseInt(document.getElementById('player1-number').value);
        player1Bets.push({ amount, number });
        displayBets();
        // Change background color of selected number on table
        const tableCells = document.querySelectorAll('#roulette-table td:nth-child(2)');
        tableCells.forEach(cell => {
            if (parseInt(cell.textContent) === number) {
                cell.style.backgroundColor = 'yellow';
                if (player2Bets.some(bet => bet.number === number)) {
                    cell.style.backgroundColor = 'lightgreen'; // Both players bet on the same number
                }
            }
        });
    });

    // Event listener for submitting player 2 bet form
    player2BetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = parseInt(document.getElementById('player2-bet').value);
        const number = parseInt(document.getElementById('player2-number').value);
        player2Bets.push({ amount, number });
        displayBets();
        // Change background color of selected number on table
        const tableCells = document.querySelectorAll('#roulette-table td:nth-child(2)');
        tableCells.forEach(cell => {
            if (parseInt(cell.textContent) === number) {
                cell.style.backgroundColor = 'cyan';
                if (player1Bets.some(bet => bet.number === number)) {
                    cell.style.backgroundColor = 'lightgreen'; // Both players bet on the same number
                }
            }
        });
    });

    document.getElementById('place-bet-player1').addEventListener('click', () => {
        const number = parseInt(document.getElementById('player1-number').value);
        const tableCells = document.querySelectorAll('#roulette-table td:nth-child(2)');
        tableCells.forEach(cell => {
            if (parseInt(cell.textContent) === number) {
                cell.style.backgroundColor = 'yellow';
            }
        });
    });

    document.getElementById('place-bet-player2').addEventListener('click', () => {
        const number = parseInt(document.getElementById('player2-number').value);
        const tableCells = document.querySelectorAll('#roulette-table td:nth-child(2)');
        tableCells.forEach(cell => {
            if (parseInt(cell.textContent) === number) {
                cell.style.backgroundColor = 'cyan';
            }
        });
    });

    spinButton.addEventListener('click', () => {
        const winningNumber = Math.floor(Math.random() * 37);

        resultArea.textContent = `Winning number: ${winningNumber}!`;

        // Calculate player winnings
        let player1Winnings = 0;
        let player2Winnings = 0;

        player1Bets.forEach(bet => {
            if (bet.number === winningNumber) {
                player1Winnings += bet.amount * 35;
            } else {
                player1Winnings -= bet.amount;
            }
        });

        player2Bets.forEach(bet => {
            if (bet.number === winningNumber) {
                player2Winnings += bet.amount * 35;
            } else {
                player2Winnings -= bet.amount;
            }
        });

        chipsTallyPlayer1 += player1Winnings;
        chipsTallyPlayer2 += player2Winnings;

        resultAreaPlayer1.textContent = `Player 1 tally: ${chipsTallyPlayer1}`;
        resultAreaPlayer2.textContent = `Player 2 tally: ${chipsTallyPlayer2}`;

        if (player1Winnings > 0 && player2Winnings > 0) {
            resultArea.style.backgroundColor = 'green';
            resultArea.textContent += ` Both players win!`;
        } else if (player1Winnings > 0) {
            resultArea.style.backgroundColor = 'green';
            resultArea.textContent += ` Player 1 wins!`;
        } else if (player2Winnings > 0) {
            resultArea.style.backgroundColor = 'green';
            resultArea.textContent += ` Player 2 wins!`;
        } else {
            resultArea.style.backgroundColor = 'white';
            resultArea.textContent += ` No winner!`;
        }
    });

    const deletePlayer1BetButton = document.getElementById('delete-player1-bet');
    const deletePlayer2BetButton = document.getElementById('delete-player2-bet');

    // Event listener for deleting player 1 bet
    deletePlayer1BetButton.addEventListener('click', () => {
        document.getElementById('player1-bet').value = '0';
        document.getElementById('player1-number').value = '0';
        player1Bets = [];
        displayBets();
        // Reset background color of player 1's table cells only
        const tableCells = document.querySelectorAll('#roulette-table td:nth-child(2)');
        tableCells.forEach(cell => {
            const number = parseInt(cell.textContent);
            if (player2Bets.some(bet => bet.number === number)) {
                cell.style.backgroundColor = 'cyan'; //
            } else {
                cell.style.backgroundColor = 'white'; //
            }
        });
    });

    // Event listener for deleting player 2 bet
    deletePlayer2BetButton.addEventListener('click', () => {
        document.getElementById('player2-bet').value = '0';
        document.getElementById('player2-number').value = '0';
        player2Bets = [];
        displayBets();
        // Reset background color of player 2's table cells only
        const tableCells = document.querySelectorAll('#roulette-table td:nth-child(2)');
        tableCells.forEach(cell => {
            const number = parseInt(cell.textContent);
            if (player1Bets.some(bet => bet.number === number)) {
                cell.style.backgroundColor = 'yellow';
            } else {
                cell.style.backgroundColor = 'white';
            }
        });
    });
});
