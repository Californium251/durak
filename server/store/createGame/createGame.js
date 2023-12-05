const getStartState = require('./getStartState');
const { ObjectId } = require('mongodb');

const createGame = async (client, options) => {
    try {
        const db = client.db('durak');
        const gamesCollection = db.collection('games');
        const usersCollection = db.collection('users');
        const { _id, name } = await usersCollection.findOne({ _id: new ObjectId(options.creator) });
        const game = getStartState({ ...options, user: { name, _id } });
        const res = await gamesCollection.insertOne(game);
        if (!res.insertedId) {
            throw new Error('Game not created');
        }
        return {
            ...game,
            _id: res.insertedId,
        };
    } catch (e) {
        console.error(e);
    }
}

module.exports = createGame;
