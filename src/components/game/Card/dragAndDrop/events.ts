import * as PIXI from "pixi.js";
import {isInteractive, isPlaceable} from "./validators";
import {returnCard, performAction} from "./actions";
import {DragAndDropParams} from "@/utils/Types";
import {setCardPosition} from "@/slices/uiSlice";

interface Draggable extends PIXI.DisplayObject {
    // @ts-ignore
    data: PIXI.InteractionData | null;
    dragging: boolean;
}

let index: number;

export const onDragStart = (params: DragAndDropParams) =>
    // @ts-ignore
    (event: PIXI.InteractionEvent): void => {
        if (event.data.originalEvent.button !== 0) return;
        const {gameState, playerId, card} = params;
        if (!isInteractive(gameState, playerId as string, card)) return;
        const sprite = event.currentTarget as Draggable;
        index = sprite.parent.getChildIndex(sprite);
        sprite.parent.addChild(sprite);
        sprite.data = event.data;
        sprite.dragging = true;
    };

// @ts-ignore
export const onDragEnd = (params: DragAndDropParams) => (event: PIXI.InteractionEvent) => {
    const {
        cardCoors,
        table,
        gameState,
        gameId,
        playerId,
        card,
        uiState,
        transport,
        setCardPosition,
        initialCardPosition,
    } = params;
    const sprite = event.currentTarget as Draggable;
    if (sprite.dragging) {
        const {
            isAcceptable,
            actionType = null,
            ...rest
        } = playerId === undefined ? {isAcceptable: false} : isPlaceable({
            cardCoors: {
                ...cardCoors,
                x: event.currentTarget.x,
                y: event.currentTarget.y
            }, table, gameState, playerId, card, uiState
        })

        if (!isAcceptable) {
            returnCard(initialCardPosition, event.currentTarget, setCardPosition);
        } else {
            if (!actionType) throw new Error('No action type was provided to initiate performAction func');
            performAction({transport, gameId, playerId, actionType, rest});
        }
        sprite.dragging = false;
        sprite.data = null;
        sprite.parent.addChildAt(sprite, index);
    }
}

// @ts-ignore
export const onDragMove = ({setCardPosition, cardCoors}) => (event: PIXI.InteractionEvent) => {
    const sprite = event.currentTarget as Draggable;
    if (sprite.dragging) {
        const newPosition = sprite.data!.getLocalPosition(sprite.parent);
        setCardPosition(newPosition.x, newPosition.y, 100);
        sprite.x = newPosition.x;
        sprite.y = newPosition.y;
    }
}
