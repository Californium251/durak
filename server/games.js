const Game = require('./classes/Game');

const Games = new Map();

const newGame = new Game(1, 2);
Games.set(1, newGame)


const createGame = (options) => {
    const { numberOfPlayers } = options;
    const gameId = Math.floor(Math.random() * 1000000);
    const game = new Game(gameId, numberOfPlayers);
    Games.set(gameId, game);
    return Games.get(gameId);
}

const getGameById = (gameId) => {
    const game = Games.get(gameId);
    return game || { message: 'game not found' };
}

module.exports = {
    createGame,
    Games,
    getGameById,
}
