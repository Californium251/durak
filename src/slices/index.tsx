import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import animationSlice from "./animationSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    gameSlice,
    animationSlice,
    uiSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
