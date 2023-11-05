const setDeck = () => {
    const cards = [
        { suit: 'hearts', rank: 'six' },
        { suit: 'hearts', rank: 'seven' },
        { suit: 'hearts', rank: 'eight' },
        { suit: 'hearts', rank: 'nine' },
        { suit: 'hearts', rank: 'ten' },
        { suit: 'hearts', rank: 'jack' },
        { suit: 'hearts', rank: 'queen' },
        { suit: 'hearts', rank: 'king' },
        { suit: 'hearts', rank: 'ace' },
        { suit: 'spades', rank: 'six' },
        { suit: 'spades', rank: 'seven' },
        { suit: 'spades', rank: 'eight' },
        { suit: 'spades', rank: 'nine' },
        { suit: 'spades', rank: 'ten' },
        { suit: 'spades', rank: 'jack' },
        { suit: 'spades', rank: 'queen' },
        { suit: 'spades', rank: 'king' },
        { suit: 'spades', rank: 'ace' },
        { suit: 'clubs', rank: 'six' },
        { suit: 'clubs', rank: 'seven' },
        { suit: 'clubs', rank: 'eight' },
        { suit: 'clubs', rank: 'nine' },
        { suit: 'clubs', rank: 'ten' },
        { suit: 'clubs', rank: 'jack' },
        { suit: 'clubs', rank: 'queen' },
        { suit: 'clubs', rank: 'king' },
        { suit: 'clubs', rank: 'ace' },
        { suit: 'diamonds', rank: 'six' },
        { suit: 'diamonds', rank: 'seven' },
        { suit: 'diamonds', rank: 'eight' },
        { suit: 'diamonds', rank: 'nine' },
        { suit: 'diamonds', rank: 'ten' },
        { suit: 'diamonds', rank: 'jack' },
        { suit: 'diamonds', rank: 'queen' },
        { suit: 'diamonds', rank: 'king' },
        { suit: 'diamonds', rank: 'ace' },
    ];
    const shuffleDeck = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    return shuffleDeck(cards);
}

const setTrump = (deck) => deck.getCards().shift();

module.exports = {
    setDeck,
    setTrump,
}