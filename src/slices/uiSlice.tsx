import {CardType, GameDataType, ContainerType, StageSettingsType} from "@/utils/Types";
import {createFanOfCards} from "@/utils/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardAppearanceType} from "@/utils/Types";
import {getPlayerAnchorPoint, positionCardOnTable, positionDeck} from "./uiUtils";
import stage from "@/components/game/Board/Stage";

type PlayersAnchorPoints = {
    [index: string]: { x: number; y: number; angle: number };
};

type TableAnchorPoint = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const initialState: {
    playersAnchorPoints: PlayersAnchorPoints;
    tableAnchorPoints: TableAnchorPoint[];
    cards: {
        [cardName: string]: CardAppearanceType;
    };
    tableSettings: ContainerType;
} = {
    playersAnchorPoints: {},
    tableAnchorPoints: [],
    cards: {},
    tableSettings: {width: 0, height: 0, x: 0, y: 0},
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setPlayersAnchorPoints: (state, action: PayloadAction<any>) => {
            const {windowWidth, windowHeight, playersIds, userId} = action.payload;
            const userIndex = playersIds.findIndex((id: string) => id === userId);
            const playersOrder = [];
            for (let i = userIndex; i < playersIds.length + userIndex; i += 1) {
                playersOrder.push(playersIds[i % playersIds.length]);
            }
            switch (playersIds.length) {
                case 2:
                    state.playersAnchorPoints[playersOrder[0]] = {
                        x: windowWidth / 2,
                        y: (windowHeight * 7) / 8,
                        angle: 0,
                    };
                    state.playersAnchorPoints[playersOrder[1]] = {
                        x: windowWidth / 2,
                        y: 0,
                        angle: 180,
                    };
                    break;
                case 3:
                    state.playersAnchorPoints[playersOrder[0]] = {
                        x: windowWidth / 2,
                        y: (windowHeight * 7) / 8,
                        angle: 0,
                    };
                    state.playersAnchorPoints[playersOrder[1]] = {
                        x: 0,
                        y: windowHeight / 2,
                        angle: 90,
                    };
                    state.playersAnchorPoints[playersOrder[2]] = {
                        x: windowWidth,
                        y: windowHeight / 2,
                        angle: 270,
                    };
                    break;
                case 4:
                    state.playersAnchorPoints[playersOrder[0]] = {
                        x: windowWidth / 2,
                        y: (windowHeight * 7) / 8,
                        angle: 0,
                    };
                    state.playersAnchorPoints[playersOrder[1]] = {
                        x: 0,
                        y: windowHeight / 2,
                        angle: 90,
                    };
                    state.playersAnchorPoints[playersOrder[2]] = {
                        x: windowWidth / 2,
                        y: 0,
                        angle: 180,
                    };
                    state.playersAnchorPoints[playersOrder[3]] = {
                        x: windowWidth,
                        y: windowHeight / 2,
                        angle: 270,
                    };
                    break;
            }
        },
        getCardCoors: (state, action: PayloadAction<{
            game: GameDataType,
            card: CardType,
            playerId: string,
            stageSettings: StageSettingsType
        }>) => {
            const {game: {cards, players, table, trump, trumpDrawn}, card, playerId, stageSettings} = action.payload;
            if (!card) throw new Error('No card received as an argument. Check UiSlice, getCardCoors action');
            type cardUiStateType =
                'playersHand'
                | 'onBoardToBeat'
                | 'onBoardBeats'
                | 'deck'
                | 'trump'
                | 'beaten'
                | { opponentId: string };
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
            switch (cardUiState) {
                case 'playersHand':
                    const playerCards = players.find((p) => p.user._id === playerId)?.cards;
                    if (playerCards) {
                        const index = playerCards.findIndex((c) => c === card);
                        const {alphaI, x, y} = createFanOfCards(index, playerCards);
                        const playerAnchorPoint = getPlayerAnchorPoint(players, playerId, stageSettings);
                        let angle: number = 0;
                        switch (playerAnchorPoint.angle) {
                            case 0:
                                angle = alphaI(index);
                                break;
                            case 90:
                                angle = alphaI(index) + 90;
                                break;
                            case 180:
                                angle = 180 - alphaI(index);
                                break;
                        }
                        state.cards[`${card.suit}-${card.rank}`] = {
                            ...state.cards[`${card.suit}-${card.rank}`],
                            x: x + playerAnchorPoint.x,
                            y: y + playerAnchorPoint.y,
                            angle, shown: true,
                        }
                    } else {
                        throw new Error('Cannot find player. Check UISlice getCardCoors action');
                    }
                    break;
                case 'onBoardToBeat':
                case 'onBoardBeats': {
                    const {x, y, angle} = positionCardOnTable(table, card, stageSettings);
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        x, y, angle, shown: true,
                    }
                    break;
                }
                case 'deck': {
                    const {x, y, angle} = positionDeck(players.length, cards.length, stageSettings);
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        x, y, angle, shown: false,
                    }
                    break;
                }
                case 'trump': {
                    const {x, y, angle} = positionDeck(players.length, cards.length, stageSettings);
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        x, y, angle: angle + 90, shown: true,
                    }
                    break;
                }
                case 'beaten':
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        x: stageSettings.width + 300,
                        y: stageSettings.height + 300,
                    }
                    break;
                default:

            }

        },
        positionCardsInHand: (
            state,
            action: PayloadAction<{ cards: CardType[]; userId: string, playerId: string }>
        ) => {
            const {cards, userId, playerId} = action.payload;
            cards.forEach((card, i, cards) => {
                if (card) {
                    const {alphaI, ...rest} = createFanOfCards(i, cards);
                    let angle: number = 0;
                    switch (state.playersAnchorPoints[playerId].angle) {
                        case 0:
                            angle = alphaI(i);
                            break;
                        case 90:
                            angle = alphaI(i) + 90;
                            break;
                        case 180:
                            angle = 180 - alphaI(i);
                            break;
                    }
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        card,
                        ...rest,
                        angle,
                        x: rest.x + state.playersAnchorPoints[playerId].x,
                        y: rest.y + state.playersAnchorPoints[playerId].y,
                        state: userId === playerId ? "playersHand" : "opponentsHand",
                    };
                }
            });
        },
        positionCardsOnTable: (
            state,
            action: PayloadAction<{
                cards: CardType[][];
                windowWidth: number;
                windowHeight: number;
            }>
        ) => {
            const {cards, windowWidth, windowHeight} = action.payload;
            cards.forEach((cardPair, i) => {
                cardPair.forEach((card, j) => {
                    if (card) {
                        state.cards[`${card.suit}-${card.rank}`] = {
                            ...state.cards[`${card.suit}-${card.rank}`],
                            card,
                            angle: 0,
                            x: (windowWidth / 2) * ((i + 1) % 3) + j * 20,
                            y:
                                cards.length < 4
                                    ? windowHeight / 2 + j * 20
                                    : windowHeight / 4 +
                                    (windowHeight / 2) * Math.floor(cards.length / 3) +
                                    j * 20,
                            state: "board",
                        };
                    }
                });
            });
        },
        showCard: (
            state,
            action: PayloadAction<{ card: CardType; shown: boolean }>
        ) => {
            const {card, shown} = action.payload;
            if (card) {
                state.cards[`${card.suit}-${card.rank}`] = {
                    ...state.cards[`${card.suit}-${card.rank}`],
                    shown,
                };
            }
        },
        setCardSize: (
            state,
            action: PayloadAction<{ card: CardType; width: number; height: number }>
        ) => {
            const {card, width, height} = action.payload;
            if (card) {
                state.cards[`${card.suit}-${card.rank}`] = {
                    ...state.cards[`${card.suit}-${card.rank}`],
                    width,
                    height,
                };
            }
        },
        setTable: (state, action: PayloadAction<any>) => {
            state.tableSettings = action.payload;
        },
    },
});

export const {
    setPlayersAnchorPoints,
    positionCardsInHand,
    positionCardsOnTable,
    showCard,
    setCardSize,
    setTable,
} = uiSlice.actions;

export default uiSlice.reducer;
