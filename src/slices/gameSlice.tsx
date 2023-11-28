import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { GameType } from "@/utils/Types";
import axios from "axios";

const initialState: GameType = {
    _id: '',
    options: {
        bid: 0,
        numberOfPlayers: 2,
        deckSize: 0,
        speed: 'slow',
        mode: 'throw-in',
        isPrivate: false,
        creator: '',
    },
    data: {
        cards: [],
        trump: { suit: '', rank: '' },
        trumpDrawn: false,
        players: [],
        playersPassed: [],
        table: [],
        gameStarted: false,
        gameFinished: false,
    }
};

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGameData = createAsyncThunk('game/fetchGameData', async () => {
    try {
        const id = window.location.href.split('/').at(-1);
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SOCKET_IO_URL}/get-game`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            params: { id }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        createGame: (state, action: PayloadAction<typeof initialState>) => {
            console.log(action.payload);
            const { options, _id, data } = action.payload;
            state._id = _id;
            state.options = options;
            state.data.players = data.players;
        },
        getGame: (state, action: PayloadAction<typeof initialState>) => {
            const { options, _id, data } = action.payload;
            state._id = _id;
            state.options = options;
            state.data = data;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchGameData.pending, (state, action) => {
            console.log('pending');
        })
        builder.addCase(fetchGameData.fulfilled, (state, action) => {
            const { options, _id, data } = action.payload;
            state._id = _id;
            state.options = options;
            state.data = data;
            console.log('ok');
        });
        builder.addCase(fetchGameData.rejected, (state, action) => {
            console.log('rejected');
        });
    },
});

export const { createGame, getGame } = gameSlice.actions;

export default gameSlice.reducer;
