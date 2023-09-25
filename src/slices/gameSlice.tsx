import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        playersTurn: 0,
        numberOfPlayers: 0,
    },
    reducers: {
        changePlayersTurn: (state, action: PayloadAction<number>) => {
            state.playersTurn = action.payload;
        }
    }
});