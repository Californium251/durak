const gameState = {
    _id: '656f87d56943b16c4ca0b0f3',
    options: {
        bid: 100,
        numberOfPlayers: 4,
        deckSize: 36,
        speed: 'slow',
        mode: 'throw-in',
        isPrivate: false,
        creator: '656f2efd0877e56c603a368d'
    },
    data: {
        cards: [
            {
                suit: 'spades',
                rank: 'jack'
            },
            {
                suit: 'clubs',
                rank: 'ace'
            },
            {
                suit: 'hearts',
                rank: 'seven'
            },
            {
                suit: 'diamonds',
                rank: 'seven'
            },
            {
                suit: 'clubs',
                rank: 'jack'
            },
            {
                suit: 'hearts',
                rank: 'eight'
            },
            {
                suit: 'hearts',
                rank: 'nine'
            },
            {
                suit: 'diamonds',
                rank: 'ten'
            },
            {
                suit: 'diamonds',
                rank: 'six'
            },
            {
                suit: 'spades',
                rank: 'six'
            },
            {
                suit: 'diamonds',
                rank: 'eight'
            }
        ],
        trump: {
            suit: 'diamonds',
            rank: 'nine'
        },
        trumpDrawn: false,
        players: [
            {
                playerId: 0,
                cards: [
                    {
                        suit: 'diamonds',
                        rank: 'ace'
                    },
                    {
                        suit: 'diamonds',
                        rank: 'king'
                    },
                    {
                        suit: 'hearts',
                        rank: 'ace'
                    },
                    {
                        suit: 'diamonds',
                        rank: 'queen'
                    },
                    {
                        suit: 'hearts',
                        rank: 'jack'
                    }
                ],
                user: {
                    name: 'Maxim',
                    _id: '656f2efd0877e56c603a368d'
                },
                ready: true,
                isPlaying: true,
            },
            {
                playerId: 1,
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
                ],
                user: {
                    name: 'Nastya',
                    _id: '656f880b6943b16c4ca0b0f5'
                },
                ready: true,
                isPlaying: true,
            },
            {
                playerId: 2,
                cards: [
                    {
                        suit: 'spades',
                        rank: 'queen'
                    },
                    {
                        suit: 'clubs',
                        rank: 'king'
                    },
                    {
                        suit: 'spades',
                        rank: 'seven'
                    },
                    {
                        suit: 'spades',
                        rank: 'king'
                    },
                    {
                        suit: 'spades',
                        rank: 'eight'
                    },
                    {
                        suit: 'spades',
                        rank: 'ten'
                    }
                ],
                user: {
                    name: 'Serega',
                    _id: '656f88246943b16c4ca0b0f6'
                },
                ready: true,
                isPlaying: true,
            },
            {
                playerId: 3,
                cards: [
                    {
                        suit: 'hearts',
                        rank: 'six'
                    },
                    {
                        suit: 'hearts',
                        rank: 'ten'
                    },
                    {
                        suit: 'diamonds',
                        rank: 'jack'
                    },
                    {
                        suit: 'clubs',
                        rank: 'nine'
                    },
                    {
                        suit: 'spades',
                        rank: 'ace'
                    },
                    {
                        suit: 'clubs',
                        rank: 'queen'
                    }
                ],
                user: {
                    name: 'Diana',
                    _id: '656f88386943b16c4ca0b0f7'
                },
                ready: true,
                isPlaying: true,
            }
        ],
        playersPassed: [],
        table: [
            [
                {
                    suit: 'spades',
                    rank: 'nine'
                }
            ]
        ],
        gameStarted: true,
        gameFinished: false,
        attackerId: '656f2efd0877e56c603a368d'
    }
}

module.exports = gameState;
