let gameState = require("../__fixtures__/mainFlowGameState");
const gameState10 = require("../__fixtures__/mainFlow/turn10");
const gameState11 = require("../__fixtures__/mainFlow/turn11");
const gameState12 = require("../__fixtures__/mainFlow/turn12");
const gameState13 = require("../__fixtures__/mainFlow/turn13");
const gameState14 = require("../__fixtures__/mainFlow/turn14");
const gameState15 = require("../__fixtures__/mainFlow/turn15");
const gameState16 = require("../__fixtures__/mainFlow/turn16");
const gameState17 = require("../__fixtures__/mainFlow/turn17");
const gameState18 = require("../__fixtures__/mainFlow/turn18");
const gameState19 = require("../__fixtures__/mainFlow/turn19");
const gameState20 = require("../__fixtures__/mainFlow/turn20");
const gameState21 = require("../__fixtures__/mainFlow/turn21");
const gameState22 = require("../__fixtures__/mainFlow/turn22");
const gameState23 = require("../__fixtures__/mainFlow/turn23");
const gameState24 = require("../__fixtures__/mainFlow/turn24");
const gameState25 = require("../__fixtures__/mainFlow/turn25");
const gameState26 = require("../__fixtures__/mainFlow/turn26");
const gameState27 = require("../__fixtures__/mainFlow/turn27");
const gameState28 = require("../__fixtures__/mainFlow/turn28");
const gameState30 = require("../__fixtures__/mainFlow/turn30");
const gameState31 = require("../__fixtures__/mainFlow/turn31");
const gameState40 = require("../__fixtures__/mainFlow/turn40");
const gameState50 = require("../__fixtures__/mainFlow/turn50");
const gameState51 = require("../__fixtures__/mainFlow/turn51");
const gameState60 = require("../__fixtures__/mainFlow/turn60");
const gameState70 = require("../__fixtures__/mainFlow/turn70");
const gameState80 = require("../__fixtures__/mainFlow/turn80");
const gameState90 = require("../__fixtures__/mainFlow/turn90");
const gameState91 = require("../__fixtures__/mainFlow/turn91");
const gameState92 = require("../__fixtures__/mainFlow/turn92");
const pass = require("../server/reducers/pass/pass");
const addCard = require("../server/reducers/addCard/addCard");
const beatCard = require("../server/reducers/beat/beat");
const pickUp = require("../server/reducers/pickUp/pickUp");
const setUplayingPlayers = require("../server/reducers/setUnplayingPlayers");

describe("main flow", () => {
  it("is first turn", () => {
    const playerIds = gameState.data.players.map((player) => player.user._id);
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "hearts",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState10);

    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[1],
        card1: {
          suit: "hearts",
          rank: "seven",
        },
        card2: {
          suit: "spades",
          rank: "six",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState11);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "hearts",
          rank: "six",
        },
      })
    );

    expect(gameState).toEqual(gameState12);

    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[1],
        card1: {
          suit: "hearts",
          rank: "six",
        },
        card2: {
          suit: "spades",
          rank: "nine",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState13);

    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[0],
      })
    );
    expect(gameState).toEqual(gameState14);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[2],
        card: {
          suit: "clubs",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState15);

    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[1],
        card1: {
          suit: "clubs",
          rank: "seven",
        },
        card2: {
          suit: "clubs",
          rank: "eight",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState16);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[2],
        card: {
          suit: "diamonds",
          rank: "eight",
        },
      })
    );
    expect(gameState).toEqual(gameState17);

    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[1],
        card1: {
          suit: "diamonds",
          rank: "eight",
        },
        card2: {
          suit: "diamonds",
          rank: "jack",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState18);

    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[0],
      })
    );
    expect(gameState).toEqual(gameState19);

    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[2],
      })
    );
    expect(gameState).toEqual(gameState20);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "diamonds",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState21);

    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[2],
        card1: {
          suit: "diamonds",
          rank: "seven",
        },
        card2: {
          suit: "diamonds",
          rank: "ten",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState22);

    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[1],
      })
    );
    expect(gameState).toEqual(gameState23);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "hearts",
          rank: "ten",
        },
      })
    );
    expect(gameState).toEqual(gameState24);

    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[2],
        card1: {
          suit: "hearts",
          rank: "ten",
        },
        card2: {
          suit: "hearts",
          rank: "king",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState25);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "clubs",
          rank: "king",
        },
      })
    );
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "diamonds",
          rank: "king",
        },
      })
    );
    expect(gameState).toEqual(gameState26);

    gameState = setUplayingPlayers(
      pickUp(gameState, {
        playerId: playerIds[2],
      })
    );
    expect(gameState).toEqual(gameState27);

    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[1],
      })
    );
    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[0],
      })
    );
    expect(gameState).toEqual(gameState28);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "hearts",
          rank: "nine",
        },
      })
    );
    expect(gameState).toEqual(gameState30);

    gameState = setUplayingPlayers(
      pickUp(gameState, {
        playerId: playerIds[1],
      })
    );
    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[0],
      })
    );
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[2],
        card: {
          suit: "clubs",
          rank: "nine",
        },
      })
    );
    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[0],
      })
    );
    gameState = setUplayingPlayers(
      pass(gameState, {
        playerId: playerIds[2],
      })
    );
    expect(gameState).toEqual(gameState31);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[2],
        card: {
          suit: "diamonds",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[0],
        card1: {
          suit: "diamonds",
          rank: "seven",
        },
        card2: {
          suit: "diamonds",
          rank: "ace",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[2] }));
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[1] }));
    expect(gameState).toEqual(gameState40);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "diamonds",
          rank: "six",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[1],
        card1: {
          suit: "diamonds",
          rank: "six",
        },
        card2: {
          suit: "diamonds",
          rank: "nine",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[0] }));
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[2] }));
    expect(gameState).toEqual(gameState50);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "clubs",
          rank: "nine",
        },
      })
    );
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "hearts",
          rank: "nine",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[2],
        card1: {
          suit: "hearts",
          rank: "nine",
        },
        card2: {
          suit: "hearts",
          rank: "ten",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[2],
        card1: {
          suit: "clubs",
          rank: "nine",
        },
        card2: {
          suit: "clubs",
          rank: "queen",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "clubs",
          rank: "ten",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[2],
        card1: {
          suit: "clubs",
          rank: "ten",
        },
        card2: {
          suit: "clubs",
          rank: "king",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "diamonds",
          rank: "queen",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[2],
        card1: {
          suit: "diamonds",
          rank: "queen",
        },
        card2: {
          suit: "diamonds",
          rank: "king",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[1] }));
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "hearts",
          rank: "queen",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[2],
        card1: {
          suit: "hearts",
          rank: "queen",
        },
        card2: {
          suit: "hearts",
          rank: "king",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    expect(gameState).toEqual(gameState51);

    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[0] }));
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[1] }));
    expect(gameState).toEqual(gameState60);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[2],
        card: {
          suit: "diamonds",
          rank: "ten",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[0],
        card1: {
          suit: "diamonds",
          rank: "ten",
        },
        card2: {
          suit: "spades",
          rank: "eight",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[2] }));
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "hearts",
          rank: "eight",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[0],
        card1: {
          suit: "hearts",
          rank: "eight",
        },
        card2: {
          suit: "hearts",
          rank: "jack",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "clubs",
          rank: "jack",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[0],
        card1: {
          suit: "clubs",
          rank: "jack",
        },
        card2: {
          suit: "spades",
          rank: "jack",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[1] }));
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[2] }));
    expect(gameState).toEqual(gameState70);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "hearts",
          rank: "ace",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[1],
        card1: {
          suit: "hearts",
          rank: "ace",
        },
        card2: {
          suit: "spades",
          rank: "seven",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[0] }));
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[2] }));
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "clubs",
          rank: "six",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[2],
        card1: {
          suit: "clubs",
          rank: "six",
        },
        card2: {
          suit: "spades",
          rank: "queen",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[1] }));
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[0] }));
    expect(gameState).toEqual(gameState80);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[2],
        card: {
          suit: "spades",
          rank: "ace",
        },
      })
    );
    expect(gameState).toEqual(gameState90);
    gameState = setUplayingPlayers(
      pickUp(gameState, { playerId: playerIds[0] })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[2] }));
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[1] }));
    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[1],
        card: {
          suit: "clubs",
          rank: "ace",
        },
      })
    );
    gameState = setUplayingPlayers(
      beatCard(gameState, {
        playerId: playerIds[0],
        card1: {
          suit: "clubs",
          rank: "ace",
        },
        card2: {
          suit: "spades",
          rank: "ace",
        },
        trump: {
          suit: "spades",
          rank: "seven",
        },
      })
    );
    gameState = setUplayingPlayers(pass(gameState, { playerId: playerIds[1] }));
    expect(gameState).toEqual(gameState91);

    gameState = setUplayingPlayers(
      addCard(gameState, {
        playerId: playerIds[0],
        card: {
          suit: "spades",
          rank: "king",
        },
      })
    );
    expect(gameState).toEqual(gameState92);
  });
});
