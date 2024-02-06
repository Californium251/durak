import {CardAppearanceType, CardType, GameDataType, PlayerType, uiStateType} from "@/utils/Types";
import {getDefender} from "@/utils/utils";
import {getRole, isPlacingOnTable, isPlacedOnUnbeatenCard, isCardAllowed, doesCardBeat} from './utils/utils';

export const isInteractive = (gameState: GameDataType, playerId: string, card: CardType): boolean => {
    const isPlayersCard: boolean = !!gameState.players
        .find((p) => p.user._id === playerId)?.cards.includes(card);
    const isActionAuthorized: boolean = gameState.attackerId === playerId
        || getDefender(gameState).user._id === playerId
        || (getDefender(gameState).user._id !== playerId && gameState.allPlayersCanAdd)
    return isPlayersCard && isActionAuthorized;
};

export type GameAction = {
    actionType?: 'add' | 'beat';
    isAcceptable: boolean;
}

export type AddCardPayload = {
    card: CardType;
}

export type BeatCardPayload = {
    card1: CardType,
    card2: CardType,
}
export const isPlaceable = (params: {
    cardCoors: { x: number, y: number }, table: {
        x: number,
        y: number,
        width: number,
        height: number
    }, gameState: GameDataType,
    playerId: string,
    card: CardType,
    uiState: uiStateType,
}): GameAction | (GameAction & (AddCardPayload | BeatCardPayload)) => {
    const {
        cardCoors,
        table,
        gameState,
        playerId,
        card,
        uiState,
    } = params;
    const role = getRole(gameState, playerId);
    if (!isPlacingOnTable(cardCoors, table)) return {isAcceptable: false};
    if (role === 'attacker' && isCardAllowed(gameState, card)) {
        return {isAcceptable: true, actionType: 'add', card}
    }
    if (role === 'adder' && gameState.allPlayersCanAdd && isCardAllowed(gameState, card)) {
        return {isAcceptable: true, actionType: 'add', card}
    }
    if (role === 'defender') {
        const {status, cardToBeat} = isPlacedOnUnbeatenCard({card, cardCoors, uiState, gameState})
        console.log(status)
        if (!status) return {isAcceptable: false}
        return {isAcceptable: true, actionType: 'beat', card1: cardToBeat, card2: card}
    }
    throw new Error('None of the cases matches in isPlaceable func');
}
