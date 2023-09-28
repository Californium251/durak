import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardType } from "@/components/Card";
import { PlayerType } from "@/components/Player";

const initialState: {
    playersTurn: number,
    numberOfPlayers: number,
    cardsToBeat: Array<CardType>,
    gameStarted: boolean,
} = {
    playersTurn: 0,
    numberOfPlayers: 0,
    cardsToBeat: [],
    gameStarted: false,
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
        },
        setNumberOfPlayers: (state, action: PayloadAction<number>) => {
            state.numberOfPlayers = action.payload;
        },
        changeGameStatus: (state, action: PayloadAction<boolean>) => {
            state.gameStarted = action.payload;
        },
    }
});

export const { changePlayersTurn, addCardToBeat, setNumberOfPlayers, changeGameStatus } = gameSlice.actions;

export default gameSlice.reducer;
