const updateHands = (game, playersToUpdate) => {
    const { players, trumpDrawn, cards, trump } = game.data;
    let updatedTrumpDrawn = trumpDrawn;
    const updatedPlayers = players
        .map((p) => {
            if (playersToUpdate.includes(p.user._id.toString())) {
                while ((cards.length > 0 || !updatedTrumpDrawn) && p.cards.length < 6) {
                    if (cards.length > 0) {
                        p.cards.push(cards.pop());
                    } else if (!trumpDrawn) {
                        p.cards.push(trump);
                        updatedTrumpDrawn = true;
                    }
                }
            }
            return p;
        })
    return {
        ...game,
        data: {
            ...game.data,
            trumpDrawn: updatedTrumpDrawn,
            players: updatedPlayers,
        }
    }
};

module.exports = updateHands;
