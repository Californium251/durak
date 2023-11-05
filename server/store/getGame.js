const { ObjectId } = require('mongodb');

const getGame = async (client, gameId) => {
    const db = client.db('durak');
    const collection = db.collection('games');
    const res = await collection.findOne({ '_id': new ObjectId(gameId) });
    return res;
}

module.exports = getGame;
