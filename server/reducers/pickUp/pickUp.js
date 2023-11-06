const _ = require('lodash');
const updateHands = require('../pass/utils/updateHands');

const pickUp = (game, data) => {
    const { table, players } = game;
    const { playerId } = data;
    const cardsToPickUp = _.flatten(table);
    const player = players.find((p) => p.playerId === playerId);
    player.cards = [...player.cards, ...cardsToPickUp];
    const attackersIds = players.filter((p) => p.playerId !== playerId).map((p) => p.playerId);
    const updatedAttackers = updateHands(game, attackersIds);
    table.length = 0;
    return {
        ...game,
        table,
        players: [...updatedAttackers, player],
    }
}

module.exports = pickUp;
