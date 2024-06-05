const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    player1: '',
    player2: ''
};

server.on('connection', ws => {
    ws.send(JSON.stringify(gameState));

    ws.on('message', message => {
        const data = JSON.parse(message);
        if (data.type === 'move') {
            gameState.board[data.index] = data.player;
            gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        } else if (data.type === 'name') {
            gameState[data.player] = data.name;
        }
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(gameState));
            }
        });
    });

    ws.on('close', () => {
        // Handle client disconnection if needed
    });
});
