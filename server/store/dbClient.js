const { MongoClient } = require('mongodb');
const getGame = require('./getGame');
const updateGame = require('./updateGame');
const createGame = require('./createGame/createGame');
const createUser = require('./createUser');
const loginUser = require('./loginUser');
const joinGame = require('./joinGame/joinGame');

const main = async (action, payload) => {
    const uri = process.env.NEXT_PUBLIC_MONGO_URI;
    const client = new MongoClient('mongodb://127.0.0.1:27017/');
    try {
        await client.connect();
        let game;
        switch (action) {
            case 'createGame':
                game = await createGame(client, payload);
                return game;
            case 'joinGame':
                game = await joinGame(client, payload);
                return game;
            case 'getGame':
                game = await getGame(client, payload);
                return game;
            case 'addCard':
            case 'beat':
            case 'pass':
            case 'pickUp':
            case 'makeReady':
            case 'initGame':
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
