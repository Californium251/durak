import { CardType } from "@/utils/Types";
import { createFanOfCards } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableSettingsType } from "@/utils/Types";

type PlayersAnchorPoints = {
  [index: number]: { x: number; y: number; angle: number };
};

type CardAppearance = {
  left: number;
  top: number;
  angle: number;
  dTop: number;
  dLeft: number;
  shown: boolean;
  state: "playersHand" | "board" | "deck" | "opponentsHand";
  width: number;
  height: number;
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
    [cardName: string]: CardAppearance;
  };
  tableSettings: TableSettingsType;
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
    setCardPairsAnchorPoints: (
      state,
      action: PayloadAction<{
        cardPairs: CardType[][];
        tableWidth: number;
        tableHeight: number;
      }>
    ) => {
      const { cardPairs, tableWidth, tableHeight } = action.payload;
      switch (cardPairs.length) {
        case 1:
        case 2:
        case 3:
          console.log(cardPairs, tableWidth, tableHeight);
          state.tableAnchorPoints = cardPairs.map((cardPair, i) => {
            return {
              width: tableWidth / cardPairs.length,
              height: tableHeight,
              x: (tableWidth / cardPairs.length) * i,
              y: tableHeight / 2,
            };
          });
          break;
        case 4:
        case 5:
        case 6:
          state.tableAnchorPoints = cardPairs.map((cardPair, i) => {
            return {
              width: tableWidth / 3,
              height: tableHeight / 2,
              x: (tableWidth / 3) * (i % 3),
              y: tableHeight / 4 + tableHeight / 2 * (i % 3),
            }
          })
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
            angle: alphaI(i),
            ...rest,
            state: areUserCards ? "playersHand" : "opponentsHand",
          };
        }
      });
    },
    positionCardsOnTable: (state, action: PayloadAction<CardType[][]>) => {
      const cards = action.payload;
      cards.forEach((cardPair, i) => {
        cardPair.forEach((card, j) => {
          if (card) {
            state.cards[`${card.suit}-${card.rank}`] = {
              ...state.cards[`${card.suit}-${card.rank}`],
              angle: 0,
              left: 0,
              top: 0,
              state: "board",
            };
          }
        });
      })
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
  setCardPairsAnchorPoints,
  positionCardsInHand,
  positionCardsOnTable,
  showCard,
  setCardSize,
  setTable,
} = uiSlice.actions;

export default uiSlice.reducer;
