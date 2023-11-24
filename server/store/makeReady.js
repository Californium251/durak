const initGame = require('./createGame/initGame');

const makeReady = (game, data) => {
    const { players } = game.data;
    const { userId } = data;
    const updatedPlayers = players.map((p) => {
        if (p.user._id.toString() === userId) {
            return {
                ...p,
                ready: true,
            }
        }
        return p;
    });
    const gameStarted = updatedPlayers.every(p => p.ready);
    const updatedGame = {
        ...game,
        data: {
            ...game.data,
            players: updatedPlayers,
        }
    }
    if (!gameStarted) {
        return updatedGame;
    }
    return initGame(updatedGame);
}

module.exports = makeReady;
