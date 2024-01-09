import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  playerId: string;
  cardToAdd: string | null;
} = {
  playerId: "",
  cardToAdd: null,
};

const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setPlayerId: (state, action: PayloadAction<string>) => {
      state.playerId = action.payload;
    },
    setCard: (state, action: PayloadAction<string | null>) => {
      state.cardToAdd = action.payload;
    },
  },
});

export const { setPlayerId, setCard } = animationSlice.actions;

export default animationSlice.reducer;
