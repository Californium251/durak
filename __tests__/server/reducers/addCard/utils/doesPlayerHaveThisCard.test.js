const doesPlayerHaveThisCard = require('../../../../../server/reducers/addCard/utils/doesPlayerHaveThisCard');

describe('doesPlayerHaveThisCard', () => {
    it('should return true if player has card', () => {
        const player = {
            user: null,
            cards: [
                {
                    suit: 'clubs',
                    rank: 'six'
                },
                {
                    suit: 'clubs',
                    rank: 'ten'
                },
                {
                    suit: 'clubs',
                    rank: 'seven'
                },
                {
                    suit: 'hearts',
                    rank: 'king'
                },
                {
                    suit: 'clubs',
                    rank: 'eight'
                },
                {
                    suit: 'hearts',
                    rank: 'queen'
                }
            ]
        };
        const card1 = { suit: 'clubs', rank: 'six' };
        const card2 = { suit: 'clubs', rank: 'jack' };
        expect(doesPlayerHaveThisCard(player, card1)).toBe(true);
        expect(doesPlayerHaveThisCard(player, card2)).toBe(false);
    });
});