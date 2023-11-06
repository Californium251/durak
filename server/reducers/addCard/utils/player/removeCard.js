const removeCard = (player, card) => {
    const cardIndex = player.cards.findIndex((c) => {
        if (c && card) {
            return c.rank === card.rank && c.suit === card.suit;
        }
    });
    player.cards.splice(cardIndex, 1);
    return player;
}

module.exports = removeCard;
