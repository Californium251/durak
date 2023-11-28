const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const beat = require('./reducers/beat/beat');
const addCard = require('./reducers/addCard/addCard');
const pass = require('./reducers/pass/pass');
const pickUp = require('./reducers/pickUp/pickUp');
const main = require('./store/dbClient');
const joinGame = require('./store/joinGame/joinGame');
const authenticateToken = require('./middlewares/authenticateToken');
const makeReady = require('./store/makeReady');
require('dotenv').config();

const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'localhost:3000';

const app = express();
console.log('frontendUrl', frontendUrl);

const corsOptions = {
    origin: frontendUrl,
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));
app.get('/get-game', authenticateToken, async (req, res) => {
    try {
        const gameId = req.query.id;
        const gameState = await main('getGame', gameId);
        res.send(gameState);
    } catch (e) {
        res.send({ message: e.message })
    }
});

app.post('/create-game', authenticateToken, async (req, res) => {
    try {
        const { body } = req;
        const game = await main('createGame', body);
        res.send(game)
    } catch (e) {
        res.send({ message: e.message })
    }
});

app.post('/join-game', authenticateToken, async (req, res) => {
    try {
        const { body } = req;
        const game = await main('joinGame', {
            gameId: body.gameId,
            reducer: joinGame,
            data: {
                username: body.username,
            }
        });
        res.send(game);
    } catch (e) {
        res.send({ message: e.message })
    }
})

app.post('/signup', async (req, res) => {
    const { body } = req;
    try {
        const user = await main('signup', body);
        res.send(user);
    } catch (e) {
        res.send({ message: e.message })
    }
});

app.post('/login', async (req, res) => {
    const { body } = req;
    try {
        const user = await main('login', body);
        res.send(user);
    } catch (e) {
        res.send({ message: e.message });
    }
});

app.post('/ready', authenticateToken, async (req, res) => {
    try {
        const { gameId, userId } = req.body;
        const game = await main('makeReady', {
            gameId,
            reducer: makeReady,
            data: {
                userId,
            }
        })
        res.send(game);
    } catch (e) {
        res.send({ message: e.message });
    }
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
io.on('connection', (socket) => {
    console.log('a user connected');
    // try {
    //     const token = socket.handshake.query.token;
    //     const decoded = jwt.verify(token, 'secret');
    //     socket.user = decoded;
    // } catch (error) {
    //     socket.disconnect();
    // }
    socket.on('pass', async ({ gameId, playerId }) => {
        const newGame = await main('pass', {
            gameId,
            reducer: pass,
            data: {
                playerId,
            }
        })
        io.emit('pass', newGame);
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
        io.emit('addCard', JSON.stringify(newGame));
    });
    socket.on('pickUp', async ({ gameId, playerId }) => {
        const updatedGame = await main('pickUp', {
            gameId,
            reducer: pickUp,
            data: {
                playerId,
            }
        })
        io.emit('pickUp', updatedGame);
    })
    socket.on('beat', async ({ gameId, card1, card2, trump, playerId }) => {
        const updatedGame = await main('beat', {
            gameId,
            reducer: beat,
            data: {
                playerId, card1, card2, trump,
            }
        });
        io.emit('beat', updatedGame);
    })
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});