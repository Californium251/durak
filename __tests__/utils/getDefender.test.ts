const { getDefender } = require("../../src/utils/utils");

describe("getDefender", () => {
  it("should return player with index 1", () => {
    const gameState = require("../../__fixtures__/testGameState");
    const defender = getDefender(gameState.data);
    expect(defender).toEqual(gameState.data.players[1]);
    gameState.data.players[1].cards = [];
    gameState.data.cards = [];
    const defender2 = getDefender(gameState.data);
    expect(defender2).toEqual(gameState.data.players[2]);
  });
});
