import {CardType, GameDataType, uiStateType} from "@/utils/Types";
import {getDefender} from "@/utils/utils";
import _flatten from "lodash/flatten";

export const isPlacingOnTable = (cardCoors: { x: number, y: number }, table: {
    x: number,
    y: number,
    width: number,
    height: number
}): boolean => cardCoors.x > table.x
    && cardCoors.y > table.y
    && cardCoors.x < table.x + table.width
    && cardCoors.y < table.y + table.height;

export const doesCardBeat = (card1: CardType, card2: CardType, trump: CardType) => {
    if (!card1 || !card2 || !trump) throw new Error('Some of arguments wasn\'t passed to doesCardBeat func');
    const ranks: { [key: string]: number } = {
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
    if (card2.suit === trump.suit && card1.suit !== trump.suit) {
        return true;
    }
    if (card1.suit === card2.suit && ranks[card2.rank] > ranks[card1.rank]) {
        return true;
    }
    return false;
}
export const isPlacedOnUnbeatenCard = (params: {
    card: CardType, cardCoors: {
        x: number,
        y: number
    }, uiState: uiStateType, gameState: GameDataType
}): {status: boolean, cardToBeat?: CardType} => {
    const {card, cardCoors, uiState, gameState} = params;
    const cardsToBeat: CardType[] = gameState.table.map((cp) => cp[0]);
    for (const cardToBeat of cardsToBeat) {
        if (!cardToBeat) throw new Error('Something gone wrong. Check isPlacingOnAnotherCard func');
        const cardUi = uiState[`${cardToBeat.suit}-${cardToBeat.rank}`]
        if (Math.abs(cardCoors.x - cardUi.x) <= cardUi.width
            && Math.abs(cardCoors.y - cardUi.y) <= cardUi.height
            && doesCardBeat(cardToBeat, card, gameState.trump)
        ) {
            return {status: true, cardToBeat};
        }
    }
    return {status: false};
}

export const getRole = (gameState: GameDataType, playerId: string): 'attacker' | 'defender' | 'adder' => {
    if (gameState.attackerId === playerId) return 'attacker';
    if (getDefender(gameState).user._id === playerId) return 'defender';
    if (!gameState.players.map((p) => p.user._id).includes(playerId)) {
        throw new Error('getRole func cannot define player type because id is not presented in the gameState')
    }
    return 'adder';
}

export const isCardAllowed = (gameState: GameDataType, card: CardType) => {
    if (gameState.table.length === 0) return true;
    return gameState.table.length < 6 && _flatten(gameState.table).map((c) => c?.rank).includes(card?.rank);
}