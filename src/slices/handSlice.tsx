import { createSlice } from "@reduxjs/toolkit";

const initialState: { suit: string, rank: string }[] = [];

const handSlice = createSlice({
    name: 'hand',
    initialState,
    reducers: {
        drawCard: (state, { payload }) => {
            state.push(payload);
        },
        makeTurn: (state, { payload }) => {
            const i = state.findIndex(({ suit, rank }) => suit === payload.suit && rank === payload.rank);
            state.splice(i, 1);
        },
    }
});

export const { drawCard, makeTurn } = handSlice.actions;

export default handSlice.reducer;
