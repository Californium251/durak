const setUnplayingPlayers = (game) => {
  const { players, cards } = game.data;
  if (cards.length > 0) {
    return game;
  }
  const updatedPlayers = players.map((p) => {
    if (game.data.gameStarted && p.cards.length === 0) {
      return {
        ...p,
        isPlaying: false,
      };
    }
    return p;
  });
  return {
    ...game,
    data: {
      ...game.data,
      players: updatedPlayers,
    },
  };
};

module.exports = setUnplayingPlayers;