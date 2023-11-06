const { MongoClient } = require('mongodb');
const getGame = require('./getGame');
const updateGame = require('./updateGame');
const createGame = require('./createGame');
const createUser = require('./createUser');
const loginUser = require('./loginUser');
require('dotenv').config()


const main = async (action, payload) => {
    const uri = process.env.NEXT_PUBLIC_MONGO_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        let game;
        switch (action) {
            case 'createGame':
                const gameId = await createGame(client, payload);
                return gameId;
            case 'getGame':
                game = await getGame(client, payload);
                return game;
            case 'addCard':
            case 'beat':
            case 'pass':
            case 'pickUp':
                game = await updateGame(client, payload);
                return game;
            case 'signup':
                const newUser = await createUser(client, payload);
                return newUser;
            case 'login':
                const user = await loginUser(client, payload);
                return user;
        }

    } catch (e) {
        console.error(e);
    }
}

main();

module.exports = main;
