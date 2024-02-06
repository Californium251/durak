import {CardAppearanceType, CardType} from "@/utils/Types";
import {TransportType} from "@/utils/Transport";
import {setCardPosition} from "@/slices/uiSlice";

export const returnCard = (cardCoors: { x: number, y: number }, sprite: {
    x: number;
    y: number;
    angle: number;
}, setCardPosition: (x: number, y: number) => void) => {
    sprite.x = cardCoors.x;
    sprite.y = cardCoors.y;
    // sprite.angle = cardCoors.angle;
    setCardPosition(cardCoors.x, cardCoors.y);
}

export const performAction = async (params: {
    transport: TransportType,
    gameId: string | undefined,
    playerId: string | undefined,
    actionType: string,
    rest: { card: CardType } | { card1: CardType, card2: CardType } | {}
}) => {
    const {transport, gameId, playerId, actionType, rest} = params;
    if (gameId === undefined || playerId === undefined) throw new Error('No gameId or playerId was passed to performAction func');
    if (actionType === 'add') {
        const {card} = rest as { card: CardType };
        const {addCard} = transport;
        await addCard(gameId, playerId, card);
    }
    if (actionType === 'beat') {
        const {card1, card2} = rest as { card1: CardType, card2: CardType };
        const {beat} = transport;
        beat(gameId, card1, card2, playerId);
    }
}