import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { GameType } from "@/utils/Types";
import axios from "axios";

const initialState: GameType = {
  _id: "",
  options: {
    bid: 0,
    numberOfPlayers: 2,
    deckSize: 0,
    speed: "slow",
    mode: "throw-in",
    isPrivate: false,
    creator: "",
  },
  data: {
    cards: [],
    trump: { suit: "", rank: "" },
    trumpDrawn: false,
    players: [],
    playersPassed: [],
    allPlayersCanAdd: false,
    table: [],
    gameStarted: false,
    gameFinished: false,
    isPickingUp: false,
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createGame: (state, action: PayloadAction<typeof initialState>) => {
      const { options, _id, data } = action.payload;
      state._id = _id;
      state.options = options;
      state.data.players = data.players;
    },
    getGame: (state, action: PayloadAction<typeof initialState>) => {
      const { options, _id, data } = action.payload;
      state._id = _id;
      state.options = options;
      state.data = data;
    },
    resetGame: (state) => {
      state = initialState;
    },
  },
});

export const { createGame, getGame, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
