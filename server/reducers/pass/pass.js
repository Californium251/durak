const updateHands = require('./utils/updateHands');

const pass = (game, data) => {
    const { playerId } = data;
    const { playersPassed, players } = game;
    if (playersPassed.includes(playerId)) {
        return game;
    }
    const updatedPlayersPassed = [...playersPassed, playerId];
    const plaersIds = players.map((p) => p.playerId);
    if (updatedPlayersPassed.length === players.length - 1) {
        return {
            ...game,
            table: [],
            players: updateHands(game, plaersIds),
        }
    } 
    return {
        ...game,
        playersPassed: updatedPlayersPassed,
    };
}

module.exports = pass;
