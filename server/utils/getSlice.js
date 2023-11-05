const getReducers = require('./getReducers');
const createSlice = require('@reduxjs/toolkit').createSlice;

const getInitialState = () => ({
    cards: [],
    trump: { suit: '', rank: '' },
    trumpDrawn: false,
    players: [],
    playersPassed: [],
    table: [],
    gameStarted: false,
});

const getSlice = (gameId) => createSlice({
    name: `game${gameId}`,
    initialState: getInitialState(),
    reducers: getReducers(),
});

module.exports = getSlice;
