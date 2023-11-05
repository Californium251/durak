const doesCardBeat = (card1, card2, trump) => {
    const ranks = {
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        jack: 11,
        queen: 12,
        king: 13,
        ace: 14,
    };
    if (card2.suit === trump.suit && card1.suit !== trump.suit) {
        return true;
    }
    if (card1.suit === card2.suit && ranks[card2.rank] > ranks[card1.rank]) {
        return true;
    }
    return false;
}

module.exports = doesCardBeat;
