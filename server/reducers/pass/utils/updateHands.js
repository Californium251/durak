const updateHands = (gameState, playersToUpdate) => {
    const { players, trumpDrawn, cards } = gameState;
    const updatedPlayers = players
        .filter((p) => playersToUpdate.includes(p.playerId))
        .map((p) => {
            while ((cards.length > 0 || !trumpDrawn) && p.cards.length < 6) {
                if (cards.length > 0) {
                    p.cards.push(cards.pop());
                } else if (!trumpDrawn) {
                    p.cards.push(trump);
                    trumpDrawn = true;
                }
            }
            return p;
        })
    return updatedPlayers;
};

module.exports = updateHands;
