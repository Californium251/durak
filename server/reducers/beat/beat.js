const beatCard = require('./utils/beatCard');
const removeCard = require('../addCard/utils/removeCard');
const onlyOnePlayerHasCards = require('./utils/onlyOnePlayerHasCards');
const doesCardBeat = require('./utils/doesCardBeat');

const beat = (game, data) => {
    const { players, table, cards, trumpDrawn } = game.data;
    const { playerId, card1, card2, trump } = data;
    const player = players.find((p) => p.user._id.toString() === playerId);
    if (!doesCardBeat(card1, card2, trump)) {
        return game;
    }
    const updatedTable = beatCard(table, card1, card2, trump);
    const updatedPlayer = removeCard(player, card2);
    if (updatedPlayer.cards.length === 0 && game.data.cards.length === 0) {
        updatedPlayer.isPlaying = false;
    }
    const updatedPlayers = players.map((p) => {
        if (p.user._id.toString() === playerId) {
            return updatedPlayer;
        }
        return p;
    })
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

module.exports = beat;
