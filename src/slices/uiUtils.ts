import {CardAppearanceType, CardType, PlayerType, cardUiStateType} from "@/utils/Types";
import {createFanOfCards} from "@/utils/utils";


export const getCardUiState: (params: {
    cards: CardType[],
    table: CardType[][],
    players: PlayerType[],
    trump: CardType,
    card: CardType,
    trumpDrawn: boolean,
    playerId: string,
}) => string | { opponentId: string } = ({
                                             cards,
                                             table,
                                             players,
                                             trump,
                                             card,
                                             trumpDrawn,
                                             playerId,
                                         }) => {
    let cardUiState: cardUiStateType = 'beaten';
    if (trump === card && !trumpDrawn) {
        cardUiState = 'trump';
    } else if (cards.includes(card)) {
        cardUiState = 'deck';
    } else if (table.map((cardPair) => cardPair[0]).includes(card)) {
        cardUiState = 'onBoardToBeat';
    } else if (table.map((cardPair) => cardPair[1]).includes(card)) {
        cardUiState = 'onBoardBeats';
    } else if (players.find((p) => p.user._id === playerId)?.cards.includes(card)) {
        cardUiState = 'playersHand';
    } else {
        players.filter((p) => p.user._id !== playerId).forEach((p) => {
            if (p.cards.includes(card)) {
                cardUiState = {opponentId: p.user._id}
            }
        });
    }
    return cardUiState;
}
export const getPlayerAnchorPoint: (players: PlayerType[], userId: string, playerId: string, stageSettings: {
    width: number,
    height: number
}) => {
    x: number,
    y: number,
    angle: number
} = (players: PlayerType[], userId: string, playerId, stageSettings: {
    width: number,
    height: number
}) => {
    const {width, height} = stageSettings;
    const playersIds: string[] = players.map((p) => p.user._id);
    const userIndex: number = playersIds.findIndex((id: string) => id === userId);
    const playersAnchorPoints: { [playerId: string]: { x: number, y: number, angle: number } } = {};
    const playersOrder: string[] = [];
    for (let i = userIndex; i < playersIds.length + userIndex; i += 1) {
        playersOrder.push(playersIds[i % playersIds.length]);
    }
    switch (playersIds.length) {
        case 2:
            playersAnchorPoints[playersOrder[0]] = {
                x: width / 2,
                y: (height * 7) / 8,
                angle: 0,
            };
            playersAnchorPoints[playersOrder[1]] = {
                x: width / 2,
                y: 0,
                angle: 180,
            };
            break;
        case 3:
            playersAnchorPoints[playersOrder[0]] = {
                x: width / 2,
                y: (height * 7) / 8,
                angle: 0,
            };
            playersAnchorPoints[playersOrder[1]] = {
                x: 0,
                y: height / 2,
                angle: 90,
            };
            playersAnchorPoints[playersOrder[2]] = {
                x: width,
                y: height / 2,
                angle: 270,
            };
            break;
        case 4:
            playersAnchorPoints[playersOrder[0]] = {
                x: width / 2,
                y: (height * 7) / 8,
                angle: 0,
            };
            playersAnchorPoints[playersOrder[1]] = {
                x: 0,
                y: height / 2,
                angle: 90,
            };
            playersAnchorPoints[playersOrder[2]] = {
                x: width / 2,
                y: 0,
                angle: 180,
            };
            playersAnchorPoints[playersOrder[3]] = {
                x: width,
                y: height / 2,
                angle: 270,
            };
            break;
    }
    return playersAnchorPoints[playerId];
}

export const positionCardOnTable = (
    cardsOnTable: CardType[][],
    card: CardType,
    stageSettings: {
        width: number;
        height: number;
    }
) => {
    const cards: { [key: string]: CardAppearanceType } = {};
    const {width, height} = stageSettings;
    cardsOnTable.forEach((cardPair, i, arr) => {
        cardPair.forEach((card, j) => {
            const getX = (i: number) => {
                switch (arr.length) {
                    case 1:
                        return width / 2;
                    case 2:
                        switch (i) {
                            case 1:
                                return width / 3;
                            case 2:
                                return 2 * width / 3;
                        }
                    case 3:
                        switch (i) {
                            case 1:
                                return width / 4;
                            case 2:
                                return width / 2;
                            case 3:
                                return 3 * width / 4;
                        }
                    case 4:
                        switch (i) {
                            case 1:
                                return width / 4;
                            case 2:
                                return width / 2;
                            case 3:
                                return 3 * width / 4;
                            case 4:
                                return width / 2;
                        }
                    case 5:
                        switch (i) {
                            case 1:
                                return width / 4;
                            case 2:
                                return width / 2;
                            case 3:
                                return 3 * width / 4;
                            case 4:
                                return width / 3;
                            case 5:
                                return 2 * width / 3;
                        }
                    case 6:
                        switch (i) {
                            case 1:
                            case 4:
                                return width / 4;
                            case 2:
                            case 5:
                                return width / 2;
                            case 3:
                            case 6:
                                return 3 * width / 4;
                        }
                }
                throw new Error('Not appropriate number of cards on table');
            }
            const getY = (i: number) => {
                if (arr.length <= 3) return height / 2;
                if (i <= 3) return height / 3;
                return 2 * height / 3;
            }
            if (card) {
                cards[`${card.suit}-${card.rank}`] = {
                    ...cards[`${card.suit}-${card.rank}`],
                    angle: 0,
                    x: getX(i + 1) + j * 20,
                    y: getY(i + 1) + j * 20,
                    state: "board",
                };
            }
        });
    });
    if (!card) throw new Error('No card passed to positionOnTable function. Check function call.')
    return cards[`${card.suit}-${card.rank}`];
};

export const positionDeck: (playersNumber: number, deckLength: number, stageSettings: {
    width: number,
    height: number
}) => { x: number, y: number, angle: number } = (playersNumber, deckLength, {width, height}) => {
    switch (playersNumber) {
        case 2:
            return {x: 0, y: height / 2, angle: 0}
        case 3:
            return {x: width / 2, y: height * 0.1, angle: 90}
        case 4:
            return {x: width * 0.1, y: height * 0.1, angle: 45}
        default:
            throw new Error('Invalid number of players. Check what you pass to positionDeck function')
    }
}

export const positionTrump = (playersNumber: number, stageSettings: {
    width: number,
    height: number
}): {
    x: number, y: number, angle: number
} => {
    const {width, height} = stageSettings;
    switch (playersNumber) {
        case 2:
            return {x: 50, y: height / 2, angle: 90}
        case 3:
            return {x: width / 2, y: height * 0.1 + 50, angle: 0}
        case 4:
            return {
                x: width * 0.1 + (50 * Math.cos(Math.PI / 4)),
                y: height * 0.1 + (50 * Math.cos(Math.PI / 4)),
                angle: -45
            }
        default:
            throw new Error('Invalid number of players. Check what you pass to positionDeck function')
    }
}

// @ts-ignore
export const positionCardsInHand: (params: {
    players: PlayerType[], playerId: string, card: CardType, stageSettings: {
        width: number,
        height: number
    }
}) => CardAppearanceType = ({players, playerId, card, stageSettings}) => {
    const playerCards = players.find((p) => p.user._id === playerId)?.cards;
    if (playerCards) {
        const index = playerCards.findIndex((c) => c === card);
        const {alphaI, x, y, zIndex} = createFanOfCards(index, playerCards);
        const playerAnchorPoint = getPlayerAnchorPoint(players, playerId, playerId, stageSettings);
        return {
            x: x + playerAnchorPoint.x,
            y: y + playerAnchorPoint.y,
            zIndex,
            shown: false,
            angle: alphaI(index)
        }
    } else {
        throw new Error('Cannot find player. Check UISlice getCardCoors action');
    }
}
