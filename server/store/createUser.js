const jwt = require('jsonwebtoken');

const createUser = async (client, { body }) => {
    const token = jwt.sign({ email: body.email, password: body.password }, 'secret', { expiresIn: '5h' });
    const collection = client.db('durak').collection('users');
    const result = await collection.insertOne({ ...body, token });
    return { userId: result.insertedId, email: body.email, token };
}

module.exports = createUser;
