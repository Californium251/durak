import { CardType } from "@/utils/Types";
import { createFanOfCards } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayersAnchorPoints = {
  [index: number]: { x: number; y: number; angle: number };
};

type CardCoors = {
  left: number;
  top: number;
  alphaI: (i: number | undefined) => number;
  dTop: number;
  dLeft: number;
};

const initialState: {
  playersAnchorPoints: PlayersAnchorPoints;
  playersCards: {
    [cardName: string]: CardCoors;
  };
} = {
  playersAnchorPoints: {},
  playersCards: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPlayersAnchorPoints: (state, action: PayloadAction<any>) => {
      const { numberOfPlayers, windowWidth, windowHeight } = action.payload;
      switch (numberOfPlayers) {
        case 2:
          state.playersAnchorPoints = {
            0: {
              x: windowWidth / 2,
              y: (windowHeight * 7) / 8,
              angle: 0,
            },
            1: {
              x: windowWidth / 2,
              y: 0,
              angle: 180,
            },
          };
          break;
        case 3:
          state.playersAnchorPoints = {
            0: {
              x: windowWidth / 2,
              y: (windowHeight * 7) / 8,
              angle: 0,
            },
            1: {
              x: 0,
              y: windowHeight / 2,
              angle: 90,
            },
            2: {
              x: windowWidth,
              y: windowHeight / 2,
              angle: 270,
            },
          };
          break;
        case 4:
          state.playersAnchorPoints = {
            0: {
              x: windowWidth / 2,
              y: (windowHeight * 7) / 8,
              angle: 0,
            },
            1: {
              x: 0,
              y: windowHeight / 2,
              angle: 90,
            },
            2: {
              x: windowWidth / 2,
              y: 0,
              angle: 180,
            },
            3: {
              x: windowWidth,
              y: windowHeight / 2,
              angle: 270,
            },
          };
          break;
      }
    },
    positionCardsInHand: (
      state,
      action: PayloadAction<{ cards: CardType[] }>
    ) => {
      const { cards } = action.payload;
      cards.forEach((card, i, cards) => {
        if (card) {
          state.playersCards[`${card.suit}-${card.rank}`] = createFanOfCards(
            i,
            cards
          );
        }
      });
    },
  },
});

export const { setPlayersAnchorPoints, positionCardsInHand } = uiSlice.actions;

export default uiSlice.reducer;
