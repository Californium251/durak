import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { CardType } from "@/components/Card";
import { PlayerType } from "@/components/Player";
import { RootState } from ".";
import { getDefendingPlayer, checkIfCardBeats, updateHands } from "@/Utils/utils";

const initialState: {
    cards: Array<CardType>,
    trump: CardType,
    players: PlayerType[],
    playersPassed: Array<string>,
    activePlayerId?: string,
    trumpDrawn?: boolean,
    cardsOnTable: Array<Array<CardType>>,
    gameStarted: boolean,
} = {
    cards: [],
    trump: { suit: '', rank: '' },
    trumpDrawn: false,
    players: [],
    playersPassed: [],
    cardsOnTable: [],
    gameStarted: false,
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
        makeTurn: (state, action: PayloadAction<CardType>) => {
            const { cardsOnTable, players, activePlayerId } = state;
            const card = action.payload;
            const checkIfCardsAppropriate = (card: CardType, cardsOnTable: Array<Array<CardType>>) => {
                if (cardsOnTable.length === 0) {
                    return true;
                }
                return _.flatten(cardsOnTable).map((c) => c ? c.rank : null).includes(card ? card.rank : null);
            }
            if (cardsOnTable && checkIfCardsAppropriate(card, cardsOnTable)) {
                cardsOnTable.push([card]);
                const activePlayer = players.find((p) => p.playerId === activePlayerId);
                if (activePlayer) {
                    activePlayer?.cards.splice(
                        activePlayer.cards.findIndex((c) => {
                            if (c && card) {
                                return c.rank === card.rank && c.suit === card.suit;
                            }
                        }), 1
                    );
                }
            }
        },
        beatCard: (state, action: PayloadAction<{ card1: CardType, card2: CardType }>) => {
            const { card1, card2 } = action.payload;
            const trump = state.trump;
            if (checkIfCardBeats(card1, card2, trump)) {
                const cardPair = state.cardsOnTable.find((cardPair) => {
                    if (card1 && cardPair[0]) {
                        return cardPair[0].rank === card1.rank && cardPair[0].suit === card1.suit;
                    }
                });
                console.log(cardPair);
                if (cardPair) {
                    cardPair[1] = card2;
                    const defendingPlayerHand = getDefendingPlayer(state).cards;
                    const indexOfCardToRemove = defendingPlayerHand
                        .findIndex((c: CardType) => {
                            if (c && card2) {
                                return c.suit === card2.suit && c.rank === card2.rank;
                            }
                        });
                    defendingPlayerHand.splice(indexOfCardToRemove, 1);
                }
                
            }
        },
        drawCards: (state) => {
            const cardsOnTable = _.flatten(state.cardsOnTable);
            const defendingPlayer = getDefendingPlayer(state);
            defendingPlayer.cards.push(...cardsOnTable);
            state.cardsOnTable = [];
            updateHands(state);
            state.activePlayerId = defendingPlayer.playerId;
        },
        endTurn: (state, action: PayloadAction<string>) => {
            state.playersPassed.push(action.payload);
            const { playersPassed, players } = state;
            const defendingPlayerId = getDefendingPlayer(state).playerId;
            const attackingPlayersIds = players.map((p) => p.playerId).filter((id) => id !== defendingPlayerId);
            const isTurnDone = attackingPlayersIds.reduce((acc, id) => {
                if (!playersPassed.includes(id)) {
                    acc = false;
                }
                return acc;
            }, true);
            if (isTurnDone) {
                state.cardsOnTable = [];
                updateHands(state);
                state.activePlayerId = defendingPlayerId;
            };
        },
        endGame: (state) => {
            state.gameStarted = false;
        }
    }
});

export const { initializeGame, makeTurn, beatCard, drawCards, endTurn, endGame } = gameSlice.actions;

export default gameSlice.reducer;
