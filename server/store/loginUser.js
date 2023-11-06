const bcrypt = require('bcrypt');

const loginUser = async (client, data) => {
    const collection = client.db('durak').collection('users');
    const result = await collection.findOne({ email: data.email });
    const match = await bcrypt.compare(data.password, result.password);
    if (match) {
        return { token: result._id, username: result.email }
    }
    throw new Error('Invalid password');
}

module.exports = loginUser;
