const isCardAllowed = require('./utils/player/isCardAllowed');
const removeCard = require('./utils/player/removeCard');
const addCardOnTable = require('./utils/table/addCardOnTable');
const onlyOnePlayerHasCards = require('../beat/utils/onlyOnePlayerHasCards');
const canPlayerAdd = require('./utils/player/canPlayerAdd');
const doesPlayerHaveThisCard = require('./utils/player/doesPlayerHaveThisCard');

const addCard = (game, data) => {
    const { players, table, cards, trumpDrawn, attackerId } = game.data;
    const { playerId, card } = data;
    const player = players.find((p) => p.user._id.toString() === playerId);
    if (!canPlayerAdd(game, playerId) || !doesPlayerHaveThisCard(player, card) || !isCardAllowed(card, table)) {
        return;
    }
    
    const updatedPlayer = removeCard(player, card);
    const updatedTable = addCardOnTable(table, card);
    const updatedPlayers = players.map((p) => {
        if (p.user._id.toString() === playerId) {
            return updatedPlayer;
        }
        return p;
    });
    if (cards.length === 0 && trumpDrawn && onlyOnePlayerHasCards(updatedPlayers)) {
        return {
            ...game,
            data: {
                ...game.data,
                players: updatedPlayers,
                table: updatedTable,
                gameFinished: true,
            }
        };
    }
    return {
        ...game,
        data: {
            ...game.data,
            players: updatedPlayers,
            playersPassed: [],
            allPlayersCanAdd: false,
            table: updatedTable,
        }
    };
}

module.exports = addCard;
