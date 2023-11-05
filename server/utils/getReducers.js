const {
    getDefender,
    checkIfCardBeats,
    updateHands,
    isAddCardAllowed,
    endTurn,
    endGame,
    allPlayersPassed,
    canPlayerAdd,
    onlyOnePlayerHasCards
} = require('./gameUtils');

const getReducers = () => ({
    initializeGame: (state, action) => {
        const { cards, trump, players, activePlayerId } = action.payload;
        state.cards = cards;
        state.trump = trump;
        state.players = players;
        state.activePlayerId = activePlayerId;
        state.gameStarted = true;
    },
    testAction: (state) => {
        const { players } = state;
        players[0].cards = [
            { suit: 'hearts', rank: 'six' },
            { suit: 'spades', rank: 'six' },
            { suit: 'clubs', rank: 'seven' },
            { suit: 'diamonds', rank: 'seven' },
            { suit: 'hearts', rank: 'eight' },
            { suit: 'spades', rank: 'eight' },
        ];
        players[1].cards = [
            { suit: 'hearts', rank: 'seven'},
            { suit: 'spades', rank: 'seven'},
            { suit: 'clubs', rank: 'eight'},
            { suit: 'diamonds', rank: 'eight'},
            { suit: 'hearts', rank: 'nine'},
            { suit: 'spades', rank: 'nine'},
        ];
        state.cards.length = 0;
        state.trumpDrawn = true;
    },
    addCard: (state, action) => {
        const { table, players, activePlayerId } = state;
        const { card, playerId } = action.payload;
        const checkIfCardsAppropriate = (card, table) => {
            if (table.length === 0) {
                return true;
            }
            return _.flatten(table).map((c) => c ? c.rank : null).includes(card ? card.rank : null);
        }
        if (table && checkIfCardsAppropriate(card, table) && isAddCardAllowed(state) && canPlayerAdd(state, playerId)) {
            table.push([card]);
            const activePlayer = players.find((p) => p.playerId === playerId);
            if (activePlayer) {
                activePlayer?.cards.splice(
                    activePlayer.cards.findIndex((c) => {
                        if (c && card) {
                            return c.rank === card.rank && c.suit === card.suit;
                        }
                    }), 1
                );
            }
        }
        if (onlyOnePlayerHasCards(state) && state.cards.length === 0) {
            endGame(state);
        }
    },
    beat: (state, action) => {
        const { card1, card2 } = action.payload;
        const trump = state.trump;
        if (checkIfCardBeats(card1, card2, trump)) {
            const cardPair = state.table.find((cardPair) => {
                if (card1 && cardPair[0]) {
                    return cardPair[0].rank === card1.rank && cardPair[0].suit === card1.suit;
                }
            });
            if (cardPair) {
                cardPair[1] = card2;
                const defenderHand = getDefender(state).cards;
                const indexOfCardToRemove = defenderHand
                    .findIndex((c) => {
                        if (c && card2) {
                            return c.suit === card2.suit && c.rank === card2.rank;
                        }
                    });
                defenderHand.splice(indexOfCardToRemove, 1);
            }
        };
        endTurn(state);
    },
    pickUp: (state) => {
        const table = _.flatten(state.table);
        const defender = getDefender(state);
        defender.cards.push(...table);
        state.table = [];
        updateHands(state);
        const defenderIndex = state.players.findIndex((p) => p.playerId === defender.playerId);
        const nextPlayerId = defenderIndex + 1 < state.players.length ? defenderIndex + 1 : 0;
        state.activePlayerId = state.players[nextPlayerId].playerId;
    },
    pass: (state, action) => {
        state.playersPassed.push(action.payload);
        if (allPlayersPassed(state)) {
            endTurn(state);
        }
    },
})

module.exports = getReducers;
