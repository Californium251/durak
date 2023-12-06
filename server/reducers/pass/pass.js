const updateHands = require('./utils/updateHands');
const updateAttacker = require('./utils/updateAttacker');

const pass = (game, data) => {
    const { playerId } = data;
    const { playersPassed, players } = game.data;
    if (playersPassed.includes(playerId)) {
        return game;
    }
    if (!game.data.allPlayersCanAdd && playerId === game.data.attackerId.toString()) {
        game.data.allPlayersCanAdd = true;
    }
    const updatedPlayersPassed = [...playersPassed, playerId];
    const playersIds = players.map((p) => p.user._id.toString());
    
    if (updatedPlayersPassed.length === players.length - 1) {
        const updatedPlayers = updateHands(game, playersIds);
        return {
            ...game,
            data: {
                ...game.data,
                table: [],
                players: updatedPlayers.data.players,
                trumpDrawn: updatedPlayers.data.trumpDrawn,
                allPlayersCanAdd: false,
                playersPassed: [],
                attackerId: updateAttacker(game),
            }
        }
    } 
    return {
        ...game,
        data: {
            ...game.data,
            playersPassed: updatedPlayersPassed, 
        }
    };
}

module.exports = pass;
