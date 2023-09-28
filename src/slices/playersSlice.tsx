import { CardType } from "@/components/Card";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HandType } from "@/components/Hand";

const initialState: Array<HandType> = [];

const playersSlice = createSlice({
    name: 'hand',
    initialState,
    reducers: {
        createPlayer: (state, action: PayloadAction<string>) => {
            state.push({
                playerId: action.payload,
                cards: []
            });
        },
        drawCard: (state, action: PayloadAction<{ playerId: string, card: CardType}>) => {
            const { playerId, card } = action.payload;
            const playerIndex = state.findIndex((player) => player.playerId === playerId);
            state[playerIndex].cards.push(card);
        },
        makeTurn: (state, action: PayloadAction<{ playerId: string, card: CardType}>) => {
            const { playerId, card } = action.payload;
            const i = state
                .find((player) => player.playerId === playerId)
                .cards.findIndex(({ suit, rank }) => suit === card.suit && rank === card.rank)
            state.splice(i, 1);
        },
    }
});

export const { drawCard, makeTurn, createPlayer } = playersSlice.actions;

export default playersSlice.reducer;
