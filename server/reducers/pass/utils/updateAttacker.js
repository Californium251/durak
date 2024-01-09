const updateAttacker = (game) => {
    const { players, attackerId } = game.data;
    const playingPlayers = players.filter((p) => p.isPlaying);
    const currentAttackerId = players.findIndex((p) => p.user._id.toString() === attackerId);
    if (game.data.isPickingUp) {
        return playingPlayers[(currentAttackerId + 2) % playingPlayers.length].user._id.toString();
    }
    return playingPlayers[(currentAttackerId + 1) % playingPlayers.length].user._id.toString();
};

module.exports = updateAttacker;
