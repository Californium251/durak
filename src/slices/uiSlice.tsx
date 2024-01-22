import { CardType } from "@/utils/Types";
import { createFanOfCards } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContainerType } from "@/utils/Types";
import { CardAppearanceType } from "@/utils/Types";

type PlayersAnchorPoints = {
  [index: number]: { x: number; y: number; angle: number };
};

type TableAnchorPoint = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const initialState: {
  playersAnchorPoints: PlayersAnchorPoints;
  tableAnchorPoints: TableAnchorPoint[];
  cards: {
    [cardName: string]: CardAppearanceType;
  };
  tableSettings: ContainerType;
} = {
  playersAnchorPoints: {},
  tableAnchorPoints: [],
  cards: {},
  tableSettings: { width: 0, height: 0, x: 0, y: 0 },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPlayersAnchorPoints: (state, action: PayloadAction<any>) => {
      const { windowWidth, windowHeight, playersIds, userId } = action.payload;
      const userIndex = playersIds.findIndex((id: string) => id === userId);
      const playersOrder = [];
      for (let i = userIndex; i < playersIds.length + userIndex; i += 1) {
        playersOrder.push(playersIds[i % playersIds.length]);
      }
      switch (playersIds.length) {
        case 2:
          state.playersAnchorPoints[playersOrder[0]] = {
            x: windowWidth / 2,
            y: (windowHeight * 7) / 8,
            angle: 0,
          };
          state.playersAnchorPoints[playersOrder[1]] = {
            x: windowWidth / 2,
            y: 0,
            angle: 180,
          };
          break;
        case 3:
          state.playersAnchorPoints[playersOrder[0]] = {
            x: windowWidth / 2,
            y: (windowHeight * 7) / 8,
            angle: 0,
          };
          state.playersAnchorPoints[playersOrder[1]] = {
            x: 0,
            y: windowHeight / 2,
            angle: 90,
          };
          state.playersAnchorPoints[playersOrder[2]] = {
            x: windowWidth,
            y: windowHeight / 2,
            angle: 270,
          };
          break;
        case 4:
          state.playersAnchorPoints[playersOrder[0]] = {
            x: windowWidth / 2,
            y: (windowHeight * 7) / 8,
            angle: 0,
          };
          state.playersAnchorPoints[playersOrder[1]] = {
            x: 0,
            y: windowHeight / 2,
            angle: 90,
          };
          state.playersAnchorPoints[playersOrder[2]] = {
            x: windowWidth / 2,
            y: 0,
            angle: 180,
          };
          state.playersAnchorPoints[playersOrder[3]] = {
            x: windowWidth,
            y: windowHeight / 2,
            angle: 270,
          };
          break;
      }
    },
    positionCardsInHand: (
      state,
      action: PayloadAction<{ cards: CardType[]; areUserCards: boolean }>
    ) => {
      const { cards, areUserCards } = action.payload;
      cards.forEach((card, i, cards) => {
        if (card) {
          const { alphaI, ...rest } = createFanOfCards(i, cards);
          state.cards[`${card.suit}-${card.rank}`] = {
            ...state.cards[`${card.suit}-${card.rank}`],
            card,
            angle: alphaI(i),
            ...rest,
            state: areUserCards ? "playersHand" : "opponentsHand",
          };
        }
      });
    },
    positionCardsOnTable: (
      state,
      action: PayloadAction<{
        cards: CardType[][];
        windowWidth: number;
        windowHeight: number;
      }>
    ) => {
      const { cards, windowWidth, windowHeight } = action.payload;
      cards.forEach((cardPair, i) => {
        cardPair.forEach((card, j) => {
          if (card) {
            state.cards[`${card.suit}-${card.rank}`] = {
              ...state.cards[`${card.suit}-${card.rank}`],
              card,
              angle: 0,
              x: (windowWidth / 2) * ((i + 1) % 3) + j * 20,
              y:
                cards.length < 4
                  ? windowHeight / 2 + j * 20
                  : windowHeight / 4 +
                    (windowHeight / 2) * Math.floor(cards.length / 3) +
                    j * 20,
              state: "board",
            };
          }
        });
      });
    },
    showCard: (
      state,
      action: PayloadAction<{ card: CardType; shown: boolean }>
    ) => {
      const { card, shown } = action.payload;
      if (card) {
        state.cards[`${card.suit}-${card.rank}`] = {
          ...state.cards[`${card.suit}-${card.rank}`],
          shown,
        };
      }
    },
    setCardSize: (
      state,
      action: PayloadAction<{ card: CardType; width: number; height: number }>
    ) => {
      const { card, width, height } = action.payload;
      if (card) {
        state.cards[`${card.suit}-${card.rank}`] = {
          ...state.cards[`${card.suit}-${card.rank}`],
          width,
          height,
        };
      }
    },
    setTable: (state, action: PayloadAction<any>) => {
      state.tableSettings = action.payload;
    },
  },
});

export const {
  setPlayersAnchorPoints,
  positionCardsInHand,
  positionCardsOnTable,
  showCard,
  setCardSize,
  setTable,
} = uiSlice.actions;

export default uiSlice.reducer;
