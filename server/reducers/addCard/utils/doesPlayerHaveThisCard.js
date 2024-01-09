const doesPlayerHaveThisCard = (player, card) => player.cards.some((c) => c.suit === card.suit && c.rank === card.rank)

module.exports = doesPlayerHaveThisCard;
