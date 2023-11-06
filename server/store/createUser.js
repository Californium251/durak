const createUser = async (client, data) => {
    const collection = client.db('durak').collection('users');
    const result = await collection.insertOne(data);
    return { token: result.insertedId, username: data.email };
}

module.exports = createUser;
