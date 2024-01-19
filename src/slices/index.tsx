import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import animationSlice from "./animationSlice";
import uiSlice from "./uiSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    gameSlice,
    animationSlice,
    uiSlice,
    authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
