import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { CardType } from "@/components/Card";
import { RootState } from "./index";
import { PlayerType } from "@/components/Player";

const initialState: {
    cards: Array<CardType>,
    trump: CardType,
    players: PlayerType[],
    activePlayerId?: string,
    trumpDrawn?: boolean,
    cardsOnTable: Array<Array<CardType>>,
    gameStarted: boolean,
    cardBuffer?: CardType,
} = {
    cards: [],
    trump: { suit: '', rank: '' },
    trumpDrawn: false,
    players: [],
    cardsOnTable: [],
    gameStarted: false,
    cardBuffer: { suit: '', rank: '' },
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initializeGame: (state, action: PayloadAction<typeof initialState>) => {
            const { cards, trump, players, activePlayerId } = action.payload;
            state.cards = cards;
            state.trump = trump;
            state.players = players;
            state.activePlayerId = activePlayerId;
            state.gameStarted = true;
        },
        setActivePlayer: (state, action: PayloadAction<string>) => {
            state.activePlayerId = action.payload;
        },
        makeTurn: (state, action: PayloadAction<CardType>) => {
            const { cardsOnTable, players, activePlayerId } = state;
            const card = action.payload;
            const checkIfCardsAppropriate = (card: CardType, cardsOnTable: Array<Array<CardType>>) => {
                if (cardsOnTable.length === 0) {
                    return true;
                }
                return _.flatten(cardsOnTable).map((c) => c.rank).includes(card.rank);
            }
            if (cardsOnTable && checkIfCardsAppropriate(card, cardsOnTable)) {
                cardsOnTable.push([card]);
                const activePlayer = players.find((p) => p.playerId === activePlayerId);
                if (activePlayer) {
                    activePlayer?.cards.splice(
                        activePlayer.cards.findIndex((c) => c.rank === card.rank && c.suit === card.suit), 1
                    );
                }
            }
        },
        addCardToBuffer: (state, action: PayloadAction<CardType>) => {
            state.cardBuffer = action.payload;
        },
        beatCard: (state, action: PayloadAction<CardType>) => {
            const cardBuffer = state.cardBuffer as CardType;
            const trump = state.trump;
            const checkIfCardBeats = (card1: CardType, card2: CardType) => {
                if (card2.suit === trump.suit && card1.suit !== trump.suit) {
                    return true;
                }
                const ranks = {
                    six: 6,
                    seven: 7,
                    eight: 8,
                    nine: 9,
                    ten: 10,
                    jack: 11,
                    queen: 12,
                    king: 13,
                    ace: 14,
                };
                if (card2.suit === card1.suit && ranks[card1.rank] < ranks[card2.rank]) {
                    return true;
                }
                return false;
            }
            if (checkIfCardBeats(action.payload, cardBuffer)) {
                const cardPair = state.cardsOnTable.find((cardPair) => cardPair[0].rank === action.payload.rank && cardPair[0].suit === action.payload.suit);
                if (cardPair) {
                    cardPair[1] = cardBuffer;
                    const indexOfActivePlayer = state.players.findIndex((p) => p.playerId === state.activePlayerId);
                    const indexOfDefendingPlayer = indexOfActivePlayer + 1 === state.players.length ? 0 : indexOfActivePlayer + 1;
                    const defendingPlayerHand = state.players[indexOfDefendingPlayer].cards;
                    const indexOfCardToRemove = defendingPlayerHand
                        .findIndex((c) => c.suit === cardBuffer.suit && c.rank === cardBuffer.rank);
                    defendingPlayerHand.splice(indexOfCardToRemove, 1);
                }
                
            }
        }
    }
});

export const { initializeGame, makeTurn, addCardToBuffer, beatCard } = gameSlice.actions;

export default gameSlice.reducer;
