import {
    CardType,
    GameDataType,
    ContainerType,
    StageSettingsType,
    CardAppearanceType
} from "@/utils/Types";
import {createFanOfCards} from "@/utils/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    getPlayerAnchorPoint,
    positionCardOnTable,
    positionDeck,
    getCardUiState,
    positionCardsInHand,
    positionTrump
} from "./uiUtils";


type PlayersAnchorPoints = {
    [index: string]: { x: number; y: number; angle: number };
};

const initialState: {
    cards: {
        [cardName: string]: CardAppearanceType;
    };
    tableSettings: ContainerType;
} = {
    cards: {},
    tableSettings: {width: 0, height: 0, x: 0, y: 0},
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        getCardCoors: (state, action: PayloadAction<{
            game: GameDataType,
            card: CardType,
            playerId: string,
            stageSettings: StageSettingsType
        }>) => {
            const {
                game: {cards, players, table, trump, trumpDrawn},
                card,
                playerId,
                stageSettings
            } = action.payload;
            if (!card) throw new Error('No card received as an argument. Check UiSlice, getCardCoors action');

            state.cards[`${card.suit}-${card.rank}`] = {
                ...state.cards[`${card.suit}-${card.rank}`],
                width: 100, height: 150,
            }

            const cardUiState = getCardUiState({
                cards,
                table,
                players,
                trump,
                card,
                trumpDrawn,
                playerId
            });

            switch (cardUiState) {
                case 'playersHand':
                    const coors = positionCardsInHand({
                        players,
                        playerId,
                        card,
                        stageSettings
                    });
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        ...coors,
                        shown: true,
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
                    const {x, y, angle} = positionTrump(players.length, stageSettings);
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        x, y, angle, shown: true,
                    }
                    break;
                }
                case 'beaten':
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        x: stageSettings.width + 300,
                        y: stageSettings.height + 300,
                        shown: false,
                    }
                    break;
                default: {
                    if (typeof cardUiState === 'string') throw new Error('Cannot set card state. Check default case in action getCardCoors.');
                    const playerCards = players.find((p) => p.user._id === cardUiState.opponentId)?.cards;
                    const index = playerCards?.findIndex((c) => c === card);
                    if (playerCards === undefined || index === undefined) throw new Error('Cannot get player cards. Check default case in cation getCardCoors.');
                    const playerAnchorPoint = getPlayerAnchorPoint(players, playerId, cardUiState.opponentId, stageSettings);
                    const {alphaI, x, y, zIndex} = createFanOfCards(index, playerCards);
                    let angle: number = 0;
                    let cardX: number = 0;
                    let cardY: number = 0;
                    if (playerAnchorPoint === undefined) {
                        state.cards[`${card.suit}-${card.rank}`] = {
                            ...state.cards[`${card.suit}-${card.rank}`],
                            x: stageSettings.width + 300,
                            y: stageSettings.height + 300,
                            shown: false,
                            zIndex,
                        }
                        return;
                    }
                    switch (playerAnchorPoint.angle) {
                        case 0:
                            angle = alphaI(index);
                            cardX = x + playerAnchorPoint.x;
                            cardY = y + playerAnchorPoint.y;
                            break;
                        case 90:
                            angle = alphaI(index) + 90;
                            cardX = y + playerAnchorPoint.x;
                            cardY = x + playerAnchorPoint.y;
                            break;
                        case 180:
                            angle = 180 - alphaI(index);
                            cardX = x + playerAnchorPoint.x;
                            cardY = y + playerAnchorPoint.y;
                            break;
                        case 270:
                            angle = alphaI(index) - 90;
                            cardX = y + playerAnchorPoint.x;
                            cardY = -x + playerAnchorPoint.y;
                    }
                    state.cards[`${card.suit}-${card.rank}`] = {
                        ...state.cards[`${card.suit}-${card.rank}`],
                        x: cardX,
                        y: cardY,
                        angle, shown: false, zIndex,
                    }
                    break;
                }

            }

        },
        setTableSize: (state, action: PayloadAction<ContainerType>) => {
            state.tableSettings = action.payload;
        },
        setCardPosition: (state, action: PayloadAction<{
            card: CardType,
            x: number,
            y: number
        }>) => {
            const {card, x, y} = action.payload;
            if (!card?.suit || !card?.rank) throw new Error('No suit or no rank of the card. Card is possibly undefined');
            state.cards[`${card.suit}-${card.rank}`] = {...state.cards[`${card.suit}-${card.rank}`], x, y}
        }
    },
});

export const {
    getCardCoors,
    setTableSize,
    setCardPosition,
} = uiSlice.actions;

export default uiSlice.reducer;
