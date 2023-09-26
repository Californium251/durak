import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardType } from "@/components/Card";

const initialState: {
    playersTurn: number,
    numberOfPlayers: number,
    cardsToBeat: Array<CardType>,
} = {
    playersTurn: 0,
    numberOfPlayers: 0,
    cardsToBeat: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changePlayersTurn: (state, action: PayloadAction<number>) => {
            state.playersTurn = action.payload;
        },
        addCardToBeat: (state, action: PayloadAction<CardType>) => {
            state.cardsToBeat.push(action.payload);
        }
    }
});

export const { changePlayersTurn, addCardToBeat } = gameSlice.actions;

export default gameSlice.reducer;
