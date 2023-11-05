const { MongoClient } = require('mongodb');
const getGame = require('./getGame');
const updateGame = require('./updateGame');
const createGame = require('./createGame');
require('dotenv').config()


const main = async (action, payload) => {
    const uri = process.env.NEXT_PUBLIC_MONGO_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        switch (action) {
            case 'createGame':
                const gameId = await createGame(client, payload);
                return gameId;
            case 'getGame':
                const game = await getGame(client, payload);
                return game;
            case 'addCard':
                const updatedGame = await updateGame(client, payload);
                return updatedGame;
            case 'beat':
                const updatedGame2 = await updateGame(client, payload);
                return updatedGame2;
        }

    } catch (e) {
        console.error(e.message);
    }
}

main();

module.exports = main;
