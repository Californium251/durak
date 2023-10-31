const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
    res.end('Hello World');
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('pass', (playerId) => {
        io.emit('pass', playerId);
    });
    socket.on('addCard', ({ playerId, card }) => {
        io.emit('addCard', { playerId, card });
    });
    socket.on('pickUp', () => {
        io.emit('pickUp');
    })
    socket.on('beat', (card1, card2) => {
        io.emit('beat', { card1, card2 });
    })
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
