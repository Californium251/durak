const addCardOnTable = require('../../../../../server/reducers/addCard/utils/addCardOnTable');

describe('addCardOnTable', () => {
    it('should add card on table', () => {
        const table = [];
        const card1 = { suit: 'clubs', rank: 'six' };
        const updatedTable1 = addCardOnTable(table, card1)
        expect(updatedTable1).toEqual([[card1]]);
        expect(table).toEqual([]);
        const card2 = { suit: 'diamonds', rank: 'six' };
        const updatedTable2 = addCardOnTable(updatedTable1, card2);
        expect(table).toEqual([]);
        expect(updatedTable1).toEqual([[card1]]);     
        expect(updatedTable2).toEqual([[card1], [card2]]);
    });
});