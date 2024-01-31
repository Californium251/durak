import {CardAppearanceType, CardType, PlayerType} from "@/utils/Types";
import {PayloadAction} from "@reduxjs/toolkit";

export const getPlayerAnchorPoint: (players: PlayerType[], userId: string, stageSettings: {
    width: number,
    height: number
}) => {
    x: number,
    y: number,
    angle: number
} = (players: PlayerType[], userId: string, stageSettings: { width: number, height: number }) => {
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
    return playersAnchorPoints[userId];
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
    cardsOnTable.forEach((cardPair, i) => {
        cardPair.forEach((card, j) => {
            if (card) {
                cards[`${card.suit}-${card.rank}`] = {
                    ...cards[`${card.suit}-${card.rank}`],
                    angle: 0,
                    x: (width / 2) * ((i + 1) % 3) + j * 20,
                    y:
                        cardsOnTable.length < 4
                            ? height / 2 + j * 20
                            : height / 4 +
                            (height / 2) * Math.floor(cardsOnTable.length / 3) +
                            j * 20,
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
            return { x: width * 0.1, y: height / 2, angle: 0 }
        case 3:
            return { x: width / 2, y: height * 0.1, angle: 90 }
        case 4:
            return { x: width * 0.1, y: height * 0.1 , angle: 45 }
        default:
            throw new Error('Invalid number of players. Check what you pass to positionDeck function')
    }
}