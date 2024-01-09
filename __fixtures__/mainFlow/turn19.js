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
      {
        suit: "hearts",
        rank: "nine",
      },
      {
        suit: "hearts",
        rank: "queen",
      },
      {
        suit: "spades",
        rank: "ten",
      },
      {
        suit: "clubs",
        rank: "ten",
      },
      {
        suit: "hearts",
        rank: "eight",
      },
      {
        suit: "diamonds",
        rank: "seven",
      },
      {
        suit: "diamonds",
        rank: "nine",
      },
      {
        suit: "clubs",
        rank: "six",
      },
      {
        suit: "spades",
        rank: "ace",
      },
      {
        suit: "clubs",
        rank: "nine",
      },
      {
        suit: "hearts",
        rank: "ten",
      },
      {
        suit: "spades",
        rank: "king",
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
            suit: "diamonds",
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
            suit: "diamonds",
            rank: "queen",
          },
          {
            suit: "clubs",
            rank: "king",
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
            suit: "hearts",
            rank: "king",
          },
          {
            suit: "clubs",
            rank: "queen",
          },
          {
            suit: "diamonds",
            rank: "ten",
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
    playersPassed: ["6593fd32966242984922c038"],
    table: [
      [
        {
          suit: "hearts",
          rank: "seven",
        },
        {
          suit: "spades",
          rank: "six",
        },
      ],
      [
        {
          suit: "hearts",
          rank: "six",
        },
        {
          suit: "spades",
          rank: "nine",
        },
      ],
      [
        {
          suit: "clubs",
          rank: "seven",
        },
        {
          suit: "clubs",
          rank: "eight",
        },
      ],
      [
        {
          suit: "diamonds",
          rank: "eight",
        },
        {
          suit: "diamonds",
          rank: "jack",
        },
      ],
    ],
    gameStarted: true,
    gameFinished: false,
    attackerId: "6593fd32966242984922c038",
    allPlayersCanAdd: true,
    isPickingUp: false,
  },
};

module.exports = mainFlowGameState;
