const MongoClient = require('mongodb').MongoClient;
const createUser = require('../server/store/createUser');
const bcrypt = require('bcrypt');

describe('createUser', () => {
    beforeAll(async () => {
        client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI || 'mongodb://localhost:27017');
        await client.connect();
    });

    it('should create a user', () => {
        bcrypt.genSalt(10).then((salt) => {
            let client;
            const body = {
                name: 'test@test.com',
                password: bcrypt.hashSync('test', salt),
            }
            const user = createUser(client, body);
            expect(user).toHaveProperty('userId');
            expect(user.name).toEqual(body.name);
            expect(user).toHaveProperty('token');
        })
    });
});