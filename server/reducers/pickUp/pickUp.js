const _flatten = require('lodash/flatten');
const updateHands = require('../pass/utils/updateHands');

const pickUp = (game, data) => {
    const { table, players } = game.data;
    const { playerId } = data;
    const cardsToPickUp = _flatten(table);
    const player = players.find((p) => p.user._id.toString() === playerId);
    player.cards = [...player.cards, ...cardsToPickUp];
    const attackersIds = players.filter((p) => p.user._id.toString() !== playerId).map((p) => p.user._id.toString());
    const updatedAttackers = updateHands(game, attackersIds).data.players;
    const defenderIndex = players.findIndex((p) => p.user._id.toString() === playerId);
    const updatedAttackerIndex = (defenderIndex + 1) % players.length;
    return {
        ...game,
        data: {
            ...game.data,
            table: [],
            players: updatedAttackers,
            attackerId: players[updatedAttackerIndex].user._id.toString(),
        }
    }
}

module.exports = pickUp;
