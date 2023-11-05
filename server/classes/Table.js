class Table {
    constructor(cards) {
        this.cards = cards || [];
    }
    addCard(card) {
        this.cards.push([card]);
    }
    beatCard(card1, card2) {
        const cardPair = this.cards.find((cardPair) => {
            if (card1 && cardPair[0]) {
                return cardPair[0].rank === card1.rank && cardPair[0].suit === card1.suit;
            }
        });
        if (cardPair) {
            cardPair[1] = card2;
        }
    }
    clearTable() {
        this.cards = [];
    }
}

module.exports = Table;
