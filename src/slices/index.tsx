import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "./deckSlice";
import playersSlice from "./playersSlice";
import gameSlice from "./gameSlice";

const store = configureStore({
    reducer: {
        deckSlice, playersSlice, gameSlice,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
