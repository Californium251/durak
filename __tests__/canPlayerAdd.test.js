const canPlayerAdd = require('../server/reducers/addCard/utils/player/canPlayerAdd');
const gameState = require('../__fixtures__/testGameState');

describe('canPlayerAdd', () => {
    it('should return false for anyone except the attacker', () => {
        expect(canPlayerAdd(gameState, '656f2efd0877e56c603a368d')).toBe(true);
        expect(canPlayerAdd(gameState, '123afefa')).toBe(false);
        expect(canPlayerAdd(gameState, '656f880b6943b16c4ca0b0f5')).toBe(false);
        expect(canPlayerAdd(gameState, '656f88246943b16c4ca0b0f6')).toBe(false);
        expect(canPlayerAdd(gameState, '656f88386943b16c4ca0b0f7')).toBe(false);
        
        gameState.data.playersPassed.push('656f2efd0877e56c603a368d');
        gameState.data.allPlayersCanAdd = true;

        expect(canPlayerAdd(gameState, '656f2efd0877e56c603a368d')).toBe(true);
        expect(canPlayerAdd(gameState, '123afefa')).toBe(false);
        expect(canPlayerAdd(gameState, '656f880b6943b16c4ca0b0f5')).toBe(false);
        expect(canPlayerAdd(gameState, '656f88246943b16c4ca0b0f6')).toBe(true);
        expect(canPlayerAdd(gameState, '656f88386943b16c4ca0b0f7')).toBe(true);
    });
});