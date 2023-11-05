class Player {
    constructor(id, cards) {
        this.playerId = id;
        this.cards = cards || [];
    }
    removeCard(card) {
        const cardIndex = this.cards.findIndex((c) => {
            if (c && card) {
                return c.rank === card.rank && c.suit === card.suit;
            }
        });
        this.cards.splice(cardIndex, 1);
    }
    addCard(card) {
        this.cards.push(card);
    }
}

module.exports = Player;
