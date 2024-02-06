import * as PIXI from "pixi.js";
import { CardAppearanceType, CardType, ContainerType } from "@/utils/Types";

interface Draggable extends PIXI.DisplayObject {
  // @ts-ignore
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

export const isInside = (
  container: ContainerType,
  x: number,
  y: number
) => {
  const { width, height } = container;
  const tableX = container.x;
  const tableY = container.y;
  return x >= tableX && x <= tableX + width && y >= tableY && y <= tableY + height;
};

// @ts-ignore
export const onDragStart = (event: PIXI.InteractionEvent) => {
  const sprite = event.currentTarget as Draggable;
  sprite.data = event.data;
  sprite.dragging = true;
};

export const onDragEnd =
  ({
    tableSettings,
    isDefender,
    addCard,
    beat,
    gameId,
    playerId,
    card,
    cardsOnTableUi,
    cardsOnTable,
  }: {
    tableSettings: ContainerType;
    isDefender: boolean;
    addCard: (gameId: string, playerId: string, card: CardType) => void;
    beat: (
      gameId: string,
      card1: CardType,
      card2: CardType,
      playerId: string
    ) => void;
    gameId: string;
    playerId: string;
    card: CardType;
    cardsOnTableUi: { [key: string]: CardAppearanceType };
    cardsOnTable: CardType[];
  }) => // @ts-ignore
  (event: PIXI.InteractionEvent) => {
    const { x, y } = event.currentTarget.toGlobal(new PIXI.Point(0, 0));
    if (isInside(tableSettings, x, y) && !isDefender) {
      const sprite = event.currentTarget as Draggable;
      sprite.dragging = false;
      sprite.data = null;
      addCard(gameId, playerId, card);
    }
    if (isDefender) {
      for (const cardOnTable of Object.values(cardsOnTableUi)) {
        if (isInside(cardOnTable, x, y)) {
          const sprite = event.currentTarget as Draggable;
          sprite.dragging = false;
          sprite.data = null;
          beat(gameId, cardOnTable.card, card, playerId);
        }
      }
    }
  };

// @ts-ignore
export const onDragMove = (event: PIXI.InteractionEvent) => {
  const sprite = event.currentTarget as Draggable;
  if (sprite.dragging) {
    const newPosition = sprite.data!.getLocalPosition(sprite.parent);
    sprite.x = newPosition.x;
    sprite.y = newPosition.y;
  }
};
