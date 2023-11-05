const Game = require('../classes/Game');

const createGame = async (client, options) => {
    const db = client.db('durak');
    const collection = db.collection('games');
    const game = new Game(options);
    const res = await collection.insertOne(game);
    return res.insertedId;
}

module.exports = createGame;
