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