import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "./deckSlice";
import handSlice from "./handSlice";
import gameSlice from "./gameSlice";

const store = configureStore({
    reducer: {
        deckSlice, handSlice, gameSlice,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
