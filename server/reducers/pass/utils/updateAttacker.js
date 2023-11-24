const updateAttacker = (game) => {
    const { players, attackerId } = game.data;
    const currentAttackerId = players.findIndex((p) => p.user._id.toString() === attackerId);
    if (currentAttackerId === players.length - 1) {
        return players[0].user._id.toString();
    }
    return players[currentAttackerId + 1].user._id.toString();
};

module.exports = updateAttacker;
