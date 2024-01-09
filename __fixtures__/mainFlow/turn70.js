const mainFlowGameState = {
  _id: "6593fd3b966242984922c039",
  options: {
    bid: 100,
    numberOfPlayers: 3,
    deckSize: 36,
    speed: "slow",
    mode: "throw-in",
    isPrivate: false,
    creator: "6593fd32966242984922c038",
  },
  data: {
    cards: [],
    trump: {
      suit: "spades",
      rank: "seven",
    },
    trumpDrawn: true,
    players: [
      {
        playerId: 0,
        cards: [
          {
            suit: "hearts",
            rank: "ace",
          },
          {
            suit: "spades",
            rank: "king",
          },
        ],
        user: {
          name: "Maxim",
          _id: "6593fd32966242984922c038",
        },
        ready: true,
        isPlaying: true,
      },
      {
        playerId: 1,
        cards: [
          {
            suit: "clubs",
            rank: "six",
          },
          {
            suit: "spades",
            rank: "ten",
          },
          {
            suit: "clubs",
            rank: "ace",
          },
          {
            suit: "spades",
            rank: "seven",
          },
        ],
        user: {
          name: "Nastya",
          _id: "6593fcfe966242984922c036",
        },
        ready: true,
        isPlaying: true,
      },
      {
        playerId: 2,
        cards: [
          {
            suit: "spades",
            rank: "queen",
          },
          {
            suit: "spades",
            rank: "ace",
          },
        ],
        user: {
          name: "Diana",
          _id: "6593fd15966242984922c037",
        },
        ready: true,
        isPlaying: true,
      },
    ],
    playersPassed: [],
    table: [],
    gameStarted: true,
    gameFinished: false,
    attackerId: "6593fd32966242984922c038",
    allPlayersCanAdd: false,
    isPickingUp: false,
  },
};

module.exports = mainFlowGameState;
