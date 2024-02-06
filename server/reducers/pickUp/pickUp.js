const _flatten = require("lodash/flatten");
const updateHands = require("../pass/utils/updateHands");
const getDefender = require("../getDefender");

const pickUp = (game, data) => {
  const playerId = data.playerId;
  const defender = getDefender(game.data);
  if (playerId.toString() !== defender.user._id.toString()) return game;
  return { ...game, data: { ...game.data, isPickingUp: true } };
};

module.exports = pickUp;
