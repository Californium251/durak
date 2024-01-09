const getDefender = (gameState) => {
  const { players, attackerId, cards } = gameState;
  const attackerIndex = players.findIndex(
    (player) => player.user._id.toString() === attackerId.toString()
  );
  let i = 1;
  while (
    players[(attackerIndex + i) % players.length].cards.length === 0 &&
    cards.length === 0
  ) {
    i++;
  }
  return players[(attackerIndex + i) % players.length];
};

module.exports = getDefender;