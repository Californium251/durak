const beatCard = require('./utils/beatCard');
const removeCard = require('../addCard/utils/player/removeCard');

const beat = (game, data) => {
    const { players, table } = game;
    const { playerId, card1, card2, trump } = data;
    const player = players[playerId];
    const updatedTable = beatCard(table, card1, card2, trump);
    const updatedPlayer = removeCard(player, card2);
    const updatedPlayers = players.map((p) => {
        if (p.id === playerId) {
            return updatedPlayer;
        }
        return p;
    })
    return {
        ...game,
        players: updatedPlayers,
        table: updatedTable,
    };
}

module.exports = beat;
