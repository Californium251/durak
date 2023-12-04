const MongoClient = require('mongodb').MongoClient;
const e = require('express');
const createGame = require('../server/store/createGame/createGame');

describe('createGame', () => {
    beforeAll(async () => {
        client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI || 'mongodb://localhost:27017');
        await client.connect();
    });

    afterAll(async () => {
        await client.close();
    });

    it('should create a game', async () => {
        const options = {
            bid: 100,
            numberOfPlayers: 2,
            deckSize: 36,
            speed: 'slow',
            mode: 'throw-in',
            isPrivate: false,
            creator: '655100215c3a2a19ebb1ae2c',
        }
        const game = await createGame(client, options);
        expect(game).toHaveProperty('_id');
        expect(game).toHaveProperty('options');
        expect(game).toHaveProperty('data');
        Object.entries(game.options).forEach(([key, value]) => {
            expect(value).toEqual(options[key]);
        });
    });
});