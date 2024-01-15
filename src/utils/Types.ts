import * as PIXI from 'pixi.js';

export type CardType = {
    suit: string,
    rank: string,
    onClick?: () => void,
    OnMouseEnter?: () => void,
    style?: Object,
    key?: number | string,
} | null;

export type CardBufferType = {
    playerId: string,
    card: CardType,
} | null;

export type GameOptionsType = {
    bid: number,
    numberOfPlayers: number,
    deckSize: number,
    speed: string,
    mode: string,
    isPrivate: boolean,
    creator: string,
}

export type GameDataType = {
    _id?: string,
    cards: Array<CardType>,
    trump: CardType,
    trumpDrawn: boolean,
    players: Array<PlayerType>,
    playersPassed: Array<string>,
    allPlayersCanAdd: boolean,
    table: Array<Array<CardType>>,
    gameStarted: boolean,
    attackerId?: string,
    gameFinished: boolean,
}

export type GameType = {
    _id: string,
    options: GameOptionsType,
    data: GameDataType,
}

export type PlayerType = {
    playerId?: number,
    cards: CardType[],
    activePlayer?: boolean,
    isReady?: boolean,
    isPlaying?: boolean,
    user: {
        name: string,
        _id: string,
    }
}

export type PointLike =
  | { x: number; y: number }
  | PIXI.Point
  | PIXI.ObservablePoint
  | number
  | [number]
  | [number, number];