const isCardAllowed = require('./utils/isCardAllowed');
const removeCard = require('./utils/removeCard');
const addCardOnTable = require('./utils/addCardOnTable');
const onlyOnePlayerHasCards = require('../beat/utils/onlyOnePlayerHasCards');
const canPlayerAdd = require('./utils/canPlayerAdd');
const doesPlayerHaveThisCard = require('./utils/doesPlayerHaveThisCard');

const addCard = (game, data) => {
    const { players, table, cards, trumpDrawn, playersPassed } = game.data;
    const { playerId, card } = data;
    const player = players.find((p) => p.user._id.toString() === playerId);
    if (!canPlayerAdd(game, playerId) || !doesPlayerHaveThisCard(player, card) || !isCardAllowed(card, table)) {
        return game;
    }

    const updatedPlayer = removeCard(player, card);
    if (updatedPlayer.cards.length === 0 && game.data.cards.length === 0) {
        playersPassed.push(playerId);
    }
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
            table: updatedTable,
        }
    };
}

module.exports = addCard;
