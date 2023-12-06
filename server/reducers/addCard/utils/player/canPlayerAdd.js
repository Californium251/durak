const canPlayerAdd = (game, playerId) => {
    const { playersPassed, allPlayersCanAdd, attackerId } = game.data;
    const attackerIndex = game.data.players.findIndex((p) => p.user._id.toString() === game.data.attackerId.toString());
    const playersIds = game.data.players.map((p) => p.user._id.toString());
    if (!playersIds.includes(playerId)) {
        return false;
    }
    const defender = game.data.players[(attackerIndex + 1) % game.data.players.length];
    if (playerId === defender.user._id.toString()) {
        return false;
    }
    if (!allPlayersCanAdd && playerId !== attackerId) {
        return false;
    }
    return true;
}

module.exports = canPlayerAdd;
