const jwt = require('jsonwebtoken');

const createUser = async (client, { body }) => {
    try {
        const token = jwt.sign({ name: body.name }, 'secret', { expiresIn: '24h' });
        const collection = client.db('durak').collection('users');
        const result = await collection.insertOne({ ...body, token });
        console.log({ userId: result.insertedId, name: body.name, token });
        return { userId: result.insertedId, name: body.name, token };
    } catch (e) {
        return { error: e };
    }
}

module.exports = createUser;
