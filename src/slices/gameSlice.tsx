import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { CardType } from "@/utils/Types";
import { PlayerType } from "@/components/game/Player";
import {
    getDefender,
    checkIfCardBeats,
    updateHands,
    isAddCardAllowed,
    endTurn,
    endGame,
    allPlayersPassed,
    canPlayerAdd,
    onlyOnePlayerHasCards
} from "../utils/utils";
import { GameType } from "@/utils/Types";

const initialState: GameType = {
    cards: [],
    trump: { suit: '', rank: '' },
    trumpDrawn: false,
    players: [],
    playersPassed: [],
    table: [],
    gameStarted: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initializeGame: (state, action: PayloadAction<typeof initialState>) => {
            const {
                cards,
                trump,
                players,
                playersPassed,
                activePlayerId,
                _id,
                table
            } = action.payload;
            state._id = _id;
            state.cards = cards;
            state.trump = trump;
            state.players = players;
            state.playersPassed = playersPassed;
            state.activePlayerId = activePlayerId;
            state.gameStarted = true;
            state.table = table;

        },
        testAction: (state) => {
            const { players } = state;
            players[0].cards = [
                { suit: 'hearts', rank: 'six' },
                { suit: 'spades', rank: 'six' },
                { suit: 'clubs', rank: 'seven' },
                { suit: 'diamonds', rank: 'seven' },
                { suit: 'hearts', rank: 'eight' },
                { suit: 'spades', rank: 'eight' },
            ];
            players[1].cards = [
                { suit: 'hearts', rank: 'seven'},
                { suit: 'spades', rank: 'seven'},
                { suit: 'clubs', rank: 'eight'},
                { suit: 'diamonds', rank: 'eight'},
                { suit: 'hearts', rank: 'nine'},
                { suit: 'spades', rank: 'nine'},
            ];
            state.cards.length = 0;
            state.trumpDrawn = true;
        },
        addCard: (state, action: PayloadAction<{ card: CardType, playerId: string }>) => {
            const { table, players, activePlayerId } = state;
            const { card, playerId } = action.payload;
            const checkIfCardsAppropriate = (card: CardType, table: Array<Array<CardType>>) => {
                if (table.length === 0) {
                    return true;
                }
                return _.flatten(table).map((c) => c ? c.rank : null).includes(card ? card.rank : null);
            }
            if (table && checkIfCardsAppropriate(card, table) && isAddCardAllowed(state) && canPlayerAdd(state, playerId)) {
                table.push([card]);
                const activePlayer = players.find((p) => p.playerId === playerId);
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
            if (onlyOnePlayerHasCards(state) && state.cards.length === 0) {
                endGame(state);
            }
        },
        beat: (state, action: PayloadAction<{ card1: CardType, card2: CardType }>) => {
            const { card1, card2 } = action.payload;
            const trump = state.trump;
            if (checkIfCardBeats(card1, card2, trump)) {
                const cardPair = state.table.find((cardPair) => {
                    if (card1 && cardPair[0]) {
                        return cardPair[0].rank === card1.rank && cardPair[0].suit === card1.suit;
                    }
                });
                if (cardPair) {
                    cardPair[1] = card2;
                    const defenderHand = getDefender(state).cards;
                    const indexOfCardToRemove = defenderHand
                        .findIndex((c: CardType) => {
                            if (c && card2) {
                                return c.suit === card2.suit && c.rank === card2.rank;
                            }
                        });
                    defenderHand.splice(indexOfCardToRemove, 1);
                }
            };
            endTurn(state);
        },
        pickUp: (state) => {
            const table = _.flatten(state.table);
            const defender = getDefender(state);
            defender.cards.push(...table);
            state.table = [];
            updateHands(state);
            const defenderIndex = state.players.findIndex((p) => p.playerId === defender.playerId);
            const nextPlayerId = defenderIndex + 1 < state.players.length ? defenderIndex + 1 : 0;
            state.activePlayerId = state.players[nextPlayerId].playerId;
        },
        pass: (state, action: PayloadAction<string>) => {
            state.playersPassed.push(action.payload);
            if (allPlayersPassed(state)) {
                endTurn(state);
            }
        },
    }
});

export const { initializeGame, addCard, beat, pickUp, pass, testAction } = gameSlice.actions;

export default gameSlice.reducer;
