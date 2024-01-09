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
      {
        suit: "spades",
        rank: "eight",
      },
      {
        suit: "hearts",
        rank: "jack",
      },
      {
        suit: "diamonds",
        rank: "six",
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
            suit: "diamonds",
            rank: "ace",
          },
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
            suit: "diamonds",
            rank: "nine",
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
            suit: "clubs",
            rank: "nine",
          },
          {
            suit: "spades",
            rank: "ace",
          },
          {
            suit: "diamonds",
            rank: "seven",
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
    table: [
      [
        {
          suit: "hearts",
          rank: "nine",
        },
      ],
    ],
    gameStarted: true,
    gameFinished: false,
    attackerId: "6593fd32966242984922c038",
    allPlayersCanAdd: false,
    isPickingUp: false,
  },
};

module.exports = mainFlowGameState;
