import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import uiSlice from "./uiSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    gameSlice,
    uiSlice,
    authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
