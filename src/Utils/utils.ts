import { Draft } from "@reduxjs/toolkit";
import { RootState } from "@/slices";
import { CardType } from "@/components/Card";
import { PlayerType } from "@/components/Player";

export const getDefendingPlayer = (state) => {
    const { activePlayerId, players } = state;
    const indexOfActivePlayer = players.findIndex((p) => p.playerId === activePlayerId);
    const indexOfDefendingPlayer = indexOfActivePlayer + 1 === players.length ? 0 : indexOfActivePlayer + 1;
    return players[indexOfDefendingPlayer];
}

export const checkIfCardBeats = (card1: CardType, card2: CardType, trump: CardType) => {
    if (card2.suit === trump.suit && card1.suit !== trump.suit) {
        return true;
    }
    type rankVals = {
        six: number;
        seven: number;
        eight: number;
        nine: number;
        ten: number;
        jack: number;
        queen: number;
        king: number;
        ace: number;
        [key: string]: number;
    };
    const ranks: rankVals = {
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
};

export const updateHands = (state) => {
    state.players.forEach((p: PlayerType) => {
        while ((state.cards.length > 0 || !state.trumpDrawn) && p.cards.length < 6 ) {
            if (state.cards.length > 0) {
                p.cards.push(state.cards.pop() as CardType);
            } else if (!state.trumpDrawn) {
                console.log('ok');
                p.cards.push(state.trump);
                state.trumpDrawn = true;
            }
        }
    })
};
