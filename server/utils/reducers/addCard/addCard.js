const isCardAllowed = require('./utils/player/isCardAllowed');
const removeCard = require('./utils/player/removeCard');
const addCardOnTable = require('./utils/table/addCardOnTable');

const addCard = (game, data) => {
    const { players, table } = game;
    const { playerId, card } = data;
    const player = players[playerId];
    if (!isCardAllowed(card, table)) {
        return;
    }
    const updatedPlayer = removeCard(player, card);
    const updatedTable = addCardOnTable(table, card);
    const updatedPlayers = players.map((p) => {
        if (p.id === playerId) {
            return updatedPlayer;
        }
        return p;
    })
    console.dir({
        ...game,
        players: updatedPlayers,
        table: updatedTable,
    })
    return {
        ...game,
        players: updatedPlayers,
        table: updatedTable,
    };
}

module.exports = addCard;
