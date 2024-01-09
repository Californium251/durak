const getDefender = require("../../getDefender");
const _flatten = require("lodash/flatten");

const updateHands = (game) => {
  const { players, trumpDrawn, cards, trump } = game.data;
  const defender = getDefender(game.data);
  if (game.data.isPickingUp) {
    defender.cards.push(..._flatten(game.data.table));
  }
  const getOrderOfPlayers = (players) => {
    const res = [];
    const attackerIndex = players.findIndex(
      (p) => p.user._id.toString() === game.data.attackerId.toString()
    );
    for (let i = attackerIndex; i < players.length + attackerIndex; i++) {
      if (players[i] !== defender) {
        res.push(players[i % players.length]);
      }
    }
    res.push(defender);
    return res;
  };
  let updatedTrumpDrawn = trumpDrawn;
  const updatedPlayers = getOrderOfPlayers(players).map((p) => {
    while ((cards.length > 0 || !updatedTrumpDrawn) && p.cards.length < 6) {
      if (cards.length > 0) {
        p.cards.push(cards.pop());
      } else if (!trumpDrawn) {
        p.cards.push(trump);
        updatedTrumpDrawn = true;
      }
    }
    return p;
  }).reduce((acc, player) => {
    const index = players.findIndex((p) => p.user._id === player.user._id);
    acc[index] = player;
    return acc;
  }, []);
  return {
    ...game,
    data: {
      ...game.data,
      trumpDrawn: updatedTrumpDrawn,
      players: updatedPlayers,
    },
  };
};

module.exports = updateHands;
