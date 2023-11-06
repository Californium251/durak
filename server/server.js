const http = require('http');
const { Server } = require('socket.io');
const createGame = require('./store/createGame');
const beat = require('./reducers/beat/beat');
const addCard = require('./reducers/addCard/addCard');
const pass = require('./reducers/pass/pass');
const pickUp = require('./reducers/pickUp/pickUp')
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
    if (req.method === 'POST' && req.url === '/signup') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const parsedData = JSON.parse(body);
            try {
                const user = await main('signup', parsedData);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } catch(e) {
                console.error(e.message);
            }
        })
    }
    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const parsedData = JSON.parse(body);
            try {
                const user = await main('login', parsedData);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } catch(e) {
                console.error(e.message);
            }
        })
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
    socket.on('pass', async ({ gameId, playerId }) => {
        const newGame = await main('pass', {
            gameId,
            reducer: pass,
            data: {
                playerId,
            }
        })
        io.emit('pass', playerId);
    });
    socket.on('addCard', async (args) => {
        const { gameId, playerId, card } = args;
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
    socket.on('pickUp', async ({ gameId, playerId }) => {
        await main('pickUp', {
            gameId,
            reducer: pickUp,
            data: {
                playerId,
            }
        })
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