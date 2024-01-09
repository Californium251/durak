const isCardAllowed = require('../../../../../server/reducers/addCard/utils/isCardAllowed')

describe('isCardAllowed', () => {
    it('shold return true if card is allowed', () => {
        const table = [];
        expect(isCardAllowed({ suit: 'clubs', rank: 'six' }, table)).toBe(true);
        table.push([{ suit: 'clubs', rank: 'six' }]);
        expect(isCardAllowed({ suit: 'hearts', rank: 'six' }, table)).toBe(true);
        expect(isCardAllowed({ suit: 'spades', rank: 'six' }, table)).toBe(true);
        expect(isCardAllowed({ suit: 'diamonds', rank: 'six' }, table)).toBe(true);
        expect(isCardAllowed({ suit: 'spades', rank: 'seven' }, table)).toBe(false);
        table[0].push({ suit: 'clubs', rank: 'seven' });
        expect(isCardAllowed({ suit: 'hearts', rank: 'seven' }, table)).toBe(true);
    })
});
