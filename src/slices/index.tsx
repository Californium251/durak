import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import animationSlice from "./animationSlice";

const store = configureStore({
  reducer: {
    gameSlice,
    animationSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
