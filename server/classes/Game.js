const Player = require('./Player');
const Deck = require('./Deck');

const deck = new Deck();
const trump = deck.removeTopCard();

class Game {
    constructor({ numberOfPlayers }) {
        this.cards = deck.getCards();
        this.trump = trump;
        this.trumpDrawn = false;
        this.players = this.setPlayers(numberOfPlayers);
        this.playersPassed = [];
        this.table = [];
        this.gameStarted = false;
    }
    setId(id) {
        this.id = id;
    }
    setPlayers(numberOfPlayers) {
        const players = [];
        for (let i = 0; i < numberOfPlayers; i += 1) {
            const player = new Player(i);
            for (let j = 0; j < 6; j += 1) {
                player.cards.push(deck.removeTopCard())
            }
            players.push(player);
        }
        return players;
    }
}

module.exports = Game;
