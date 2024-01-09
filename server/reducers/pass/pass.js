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
    
    if (updatedPlayersPassed.length === players.filter((p) => p.isPlaying).length - 1) {
        const updatedGame = updateHands(game);
        return {
            ...game,
            data: {
                ...game.data,
                table: [],
                players: updatedGame.data.players,
                trumpDrawn: updatedGame.data.trumpDrawn,
                allPlayersCanAdd: false,
                playersPassed: [],
                attackerId: updateAttacker(game),
                isPickingUp: false,
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
