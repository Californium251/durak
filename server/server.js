const http = require('http');
const { Server } = require('socket.io');
const createGame = require('./store/createGame');
const beat = require('./utils/reducers/beat/beat');
const addCard = require('./utils/reducers/addCard/addCard');
const main = require('./store/dbClient');

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/create-game') {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const parsedData = JSON.parse(body);
                const gameId = await main('createGame', parsedData);
                const game = await main('getGame', gameId);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(game))
            })
        } catch (e) {
            res.writeHead(500);
            res.end();
        }
    }
    if (req.method === 'GET' && req.url.startsWith('/get-game')) {
        try {
            const gameId = req.url.split('/').at(-1);
            const gameState = await main('getGame', gameId);
            res.end(JSON.stringify(gameState));
        } catch (e) {
            res.end(JSON.stringify({ message: 'error' }))
        }
    }
});

const io = new Server(server, {
    cors: {
        origin: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('pass', (playerId) => {
        io.emit('pass', playerId);
    });
    socket.on('addCard', async ({ gameId, playerId, card }) => {
        await main('addCard', {
            gameId,
            reducer: addCard,
            data: {
                playerId, card
            }
        });
        const newGame = await main('getGame', gameId);
        io.emit('addCard', { playerId, card });
    });
    socket.on('pickUp', () => {
        io.emit('pickUp');
    })
    socket.on('beat', async (gameId, card1, card2, trump, playerId) => {
        await main('beat', {
            gameId,
            reducer: beat,
            data: {
                playerId, card1, card2, trump,
            }
        });
        io.emit('beat', { card1, card2 });
    })
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});