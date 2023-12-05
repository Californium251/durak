const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const loginUser = async (client, data) => {
    try {
        const collection = client.db('durak').collection('users');
        const { body } = data;
        const result = await collection.findOne({ name: body.name });
        const match = await bcrypt.compare(body.password, result.password);
        if (match) {
            const token = jwt.sign(data, 'secret', { expiresIn: '5h' });
            return { userId: new ObjectId(result._id), name: result.name, token }
        }
        throw new Error('Invalid password');
    } catch (e) {
        return new Error(e.message);
    }
}

module.exports = loginUser;
