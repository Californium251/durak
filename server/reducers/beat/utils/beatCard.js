const doesCardBeat = require('./doesCardBeat');
const areCardsEqual = require('./areCardsEqual');

const beatCard = (table, card1, card2, trump) => {
    if (!doesCardBeat(card1, card2, trump)) {
        return table;
    }
    const newTable = table.map((cardPair) => {
        if (areCardsEqual(cardPair[0], card1)) {
            return [card1, card2];
        }
        return cardPair;
    })
    return newTable;
}

module.exports = beatCard;
