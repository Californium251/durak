const getGame = require("./getGame");
const { ObjectId } = require("mongodb");
const setUnplayingPlayers = require("../reducers/setUnplayingPlayers");

const updateGame = async (client, payload) => {
  const { gameId, reducer, data } = payload;
  const collection = client.db("durak").collection("games");
  const game = await getGame(client, gameId);
  const updatedGame = setUnplayingPlayers(reducer(game, data));
  await collection.updateOne(
    { _id: new ObjectId(gameId) },
    { $set: updatedGame }
  );
  return await getGame(client, gameId);
};

module.exports = updateGame;
