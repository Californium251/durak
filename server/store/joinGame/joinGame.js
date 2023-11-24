const ObjectId = require('mongodb').ObjectId;

const joinGame = async (client, payload) => {
    const { gameId } = payload;
    const { username } = payload.data;
    try {
        const db = client.db('durak');
        const usersCollection = db.collection('users');
        const gamesCollection = db.collection('games');
        const { _id, email } = await usersCollection.findOne({ email: username });
        const game = await gamesCollection.findOne({ _id: new ObjectId(gameId) });
        const emptyPlayer = game.data.players.find(p => p.user === null)
        if (emptyPlayer) {
            emptyPlayer.user = { email, _id };
            await gamesCollection.updateOne(
                { _id: new ObjectId(gameId) },
                { $set: game }
            );
            return game;
        }
        throw new Error('Game is full');
    } catch (e) {
        return e;
    }
}

module.exports = joinGame;
