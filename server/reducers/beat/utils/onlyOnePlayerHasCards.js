const onlyOnePlayerHasCards = (players) => players.filter((p) => p.cards.length > 0).length === 1;

module.exports = onlyOnePlayerHasCards;
