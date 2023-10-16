import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { CardType } from "@/components/Card";
import { PlayerType } from "@/components/Player";
import { RootState } from ".";
import {
    getDefendingPlayer,
    checkIfCardBeats,
    updateHands,
    isAddCardAllowed,
    noCardsInDeck,
    onlyOnePlayerHasCards,
} from "@/Utils/utils";

const initialState: {
    cards: Array<CardType>,
    trump: CardType,
    players: PlayerType[],
    playersPassed: Array<string>,
    activePlayerId?: string,
    trumpDrawn?: boolean,
    table: Array<Array<CardType>>,
    gameStarted: boolean,
} = {
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
            const { cards, trump, players, activePlayerId } = action.payload;
            state.cards = cards;
            state.trump = trump;
            state.players = players;
            state.activePlayerId = activePlayerId;
            state.gameStarted = true;
        },
        testAction: (state) => {
            const { players } = state;
            players[0].cards = [
                { suit: 'hearts', rank: 'six' },
                { suit: 'hearts', rank: 'six' },
                { suit: 'hearts', rank: 'six' },
                { suit: 'hearts', rank: 'six' },
                { suit: 'hearts', rank: 'six' },
                { suit: 'hearts', rank: 'six' },
            ];
            players[1].cards = [
                { suit: 'hearts', rank: 'ace'},
                { suit: 'hearts', rank: 'ace'},
                { suit: 'hearts', rank: 'ace'},
                { suit: 'hearts', rank: 'ace'},
                { suit: 'hearts', rank: 'ace'},
                { suit: 'hearts', rank: 'ace'},
            ]
        },
        addCard: (state, action: PayloadAction<CardType>) => {
            const { table, players, activePlayerId } = state;
            const card = action.payload;
            const checkIfCardsAppropriate = (card: CardType, table: Array<Array<CardType>>) => {
                if (table.length === 0) {
                    return true;
                }
                return _.flatten(table).map((c) => c ? c.rank : null).includes(card ? card.rank : null);
            }
            if (table && checkIfCardsAppropriate(card, table) && isAddCardAllowed(state)) {
                table.push([card]);
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
        beat: (state, action: PayloadAction<{ card1: CardType, card2: CardType }>) => {
            const { card1, card2 } = action.payload;
            const trump = state.trump;
            if (checkIfCardBeats(card1, card2, trump)) {
                const cardPair = state.table.find((cardPair) => {
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
            };
            if (!isAddCardAllowed(state)) {
                if (noCardsInDeck(state) && onlyOnePlayerHasCards(state)) {
                    console.log('game over');
                    state.gameStarted = false;
                } else {
                    state.table = [];
                    updateHands(state);
                    state.activePlayerId = getDefendingPlayer(state).playerId;
                }
            };
        },
        pickUp: (state) => {
            const table = _.flatten(state.table);
            const defendingPlayer = getDefendingPlayer(state);
            defendingPlayer.cards.push(...table);
            state.table = [];
            updateHands(state);
            const defendingPlayerIndex = state.players.findIndex((p) => p.playerId === defendingPlayer.playerId);
            const nextPlayerId = defendingPlayerIndex + 1 < state.players.length ? defendingPlayerIndex + 1 : 0;
            state.activePlayerId = state.players[nextPlayerId].playerId;
        },
        pass: (state, action: PayloadAction<string>) => {
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
                state.table = [];
                updateHands(state);
                state.activePlayerId = defendingPlayerId;
            };
        },
        endGame: (state) => {
            state.gameStarted = false;
        },
    }
});

export const { initializeGame, addCard, beat, pickUp, pass, endGame, testAction } = gameSlice.actions;

export default gameSlice.reducer;
