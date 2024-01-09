const getDefender = require("../../getDefender");

const canPlayerAdd = (game, playerId) => {
  const { allPlayersCanAdd, attackerId } = game.data;
  const players = game.data.players.filter((p) => p.isPlaying);
  const playersIds = players.map((p) => p.user._id.toString());
  if (!playersIds.includes(playerId)) {
    return false;
  }
  const defender = getDefender(game.data);
  if (playerId === defender.user._id.toString()) {
    return false;
  }
  if (!allPlayersCanAdd && playerId !== attackerId) {
    return false;
  }
  return true;
};

module.exports = canPlayerAdd;
