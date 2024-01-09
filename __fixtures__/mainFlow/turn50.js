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
    cards: [
      {
        suit: "clubs",
        rank: "ace",
      },
      {
        suit: "clubs",
        rank: "jack",
      },
    ],
    trump: {
      suit: "spades",
      rank: "seven",
    },
    trumpDrawn: false,
    players: [
      {
        playerId: 0,
        cards: [
          {
            suit: "spades",
            rank: "jack",
          },
          {
            suit: "hearts",
            rank: "ace",
          },
          {
            suit: "spades",
            rank: "king",
          },
          {
            suit: "hearts",
            rank: "queen",
          },
          {
            suit: "hearts",
            rank: "jack",
          },
          {
            suit: "spades",
            rank: "eight",
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
            suit: "diamonds",
            rank: "queen",
          },
          {
            suit: "clubs",
            rank: "six",
          },
          {
            suit: "hearts",
            rank: "eight",
          },
          {
            suit: "clubs",
            rank: "ten",
          },
          {
            suit: "spades",
            rank: "ten",
          },
          {
            suit: "hearts",
            rank: "nine",
          },
          {
            suit: "clubs",
            rank: "nine",
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
            suit: "clubs",
            rank: "queen",
          },
          {
            suit: "spades",
            rank: "ace",
          },
          {
            suit: "diamonds",
            rank: "ten",
          },
          {
            suit: "hearts",
            rank: "ten",
          },
          {
            suit: "hearts",
            rank: "king",
          },
          {
            suit: "clubs",
            rank: "king",
          },
          {
            suit: "diamonds",
            rank: "king",
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
    attackerId: "6593fcfe966242984922c036",
    allPlayersCanAdd: false,
    isPickingUp: false,
  },
};

module.exports = mainFlowGameState;
