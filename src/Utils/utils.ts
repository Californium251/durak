import { CardType } from "./Types";
import { PlayerType } from "../components/Player";

export const getDefender = (state: any) => {
    const { activePlayerId, players } = state;
    const indexOfActivePlayer = players.findIndex((p: PlayerType) => p.playerId === activePlayerId);
    const indexOfDefendingPlayer = indexOfActivePlayer + 1 === players.length ? 0 : indexOfActivePlayer + 1;
    return players[indexOfDefendingPlayer];
}

export const checkIfCardBeats = (card1: CardType, card2: CardType, trump: CardType) => {
    if (card2 !== null && card1 !== null  && trump !== null && card2.suit === trump.suit && card1.suit !== trump.suit) {
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
    if (card1 !== null && card2 !== null && card2.suit === card1.suit && ranks[card1.rank] < ranks[card2.rank]) {
        return true;
    }
    return false;
};

export const updateHands = (state: any) => {
    state.players.forEach((p: PlayerType) => {
        while ((state.cards.length > 0 || !state.trumpDrawn) && p.cards.length < 6 ) {
            if (state.cards.length > 0) {
                p.cards.push(state.cards.pop() as CardType);
            } else if (!state.trumpDrawn) {
                p.cards.push(state.trump);
                state.trumpDrawn = true;
            }
        }
    })
};

export const isAddCardAllowed = (state: any) => state
    .table.map((cardPair: Array<Array<CardType>>) => cardPair[0]).length < 6 || getDefender(state).cards.length === 0;

export const noCardsInDeck = (state: any) => state.cards.length === 0;

export const onlyOnePlayerHasCards = (state: any) => state.players.map((p: PlayerType) => p.cards).reduce((acc: any, cards: Array<CardType>) => {
    if (cards.length !== 0) {
        acc += 1;
    }
    return acc;
}, 0) === 1;

export const areAllCardsBeaten = (state: any) => {
    if (state.table.length === 0) {
        return false;
    }
    return state.table.findIndex(([, card2]: Array<CardType>) => card2 === undefined) === -1
};

export const endTurn = (state: any) => {
    if (!isAddCardAllowed(state)) {
        if (noCardsInDeck(state) && onlyOnePlayerHasCards(state)) {
            state.gameStarted = false;
        } else if (areAllCardsBeaten(state)) {
            state.table = [];
            updateHands(state);
            state.activePlayerId = getDefender(state).playerId;
        }
    };
    if (areAllCardsBeaten(state) && allPlayersPassed(state)) {
        state.table = [];
        state.playersPassed = [];
        updateHands(state);
        state.activePlayerId = getDefender(state).playerId;
    };
};

export const allPlayersPassed = (state: any) => state.playersPassed.length + 1 === state.players.length;

export const canPlayerAdd = (state: any, playerId: string) => {
    const { activePlayerId, playersPassed } = state;
    const defender = getDefender(state);
    const activePlayerPassed = playersPassed.includes(activePlayerId);
    if (playerId === defender.playerId) {
        return false;
    } else if (playerId === activePlayerId) {
        return true;
    } else if (activePlayerPassed) {
        return true;
    }
    return false;
}

export const endGame = (state: any) => {
    state.cards = [];
    state.trump = { suit: '', rank: '' };
    state.trumpDrawn = false;
    state.players = [];
    state.playersPassed = [];
    state.table = [];
    state.gameStarted = false;
}
