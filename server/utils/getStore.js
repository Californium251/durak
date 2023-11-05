const { configureStore } = require("@reduxjs/toolkit");
const getSlice = require("./getSlice");

const store = (gameId) => configureStore({
    reducer: {
        gameSlice: getSlice(gameId).reducer,
    }
});

module.exports = store;
