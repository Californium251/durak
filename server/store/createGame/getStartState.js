const _omit = require('lodash/omit');

const getStartState = (options) => {
    const createPlayers = (numberOfPlayers) => {
        const players = [];
        for (let i = 0; i < numberOfPlayers; i++) {
            players.push({
                playerId: i,
                cards: [],
                user: i === 0 ? options.user : null,
                ready: false,
            });
        }
        return players;
    }
    return {
        options: _omit(options, ['user']),
        data: {
            cards: [],
            trump: null,
            trumpDrawn: false,
            players: createPlayers(options.numberOfPlayers),
            playersPassed: [],
            table: [],
            gameStarted: false,
            gameFinished: false,
        }
    }
}

module.exports = getStartState;
