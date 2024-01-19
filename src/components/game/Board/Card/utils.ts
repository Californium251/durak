import * as PIXI from "pixi.js";
import { CardType, TableSettingsType } from "@/utils/Types";

interface Draggable extends PIXI.DisplayObject {
  data: PIXI.InteractionData | null;
  dragging: boolean;
}

export const isInside = (
  tableSettings: TableSettingsType,
  left: number,
  top: number
) => {
  const { width, height, x, y } = tableSettings;
  return left >= x && left <= x + width && top >= y && top <= y + height;
};

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
    gameId,
    playerId,
    card,
  }: {
    tableSettings: TableSettingsType;
    isDefender: boolean;
    addCard: (gameId: string, playerId: string, card: CardType) => void;
    gameId: string;
    playerId: string;
    card: CardType;
  }) =>
  (event: PIXI.InteractionEvent) => {
    const { x, y } = event.currentTarget.toGlobal(new PIXI.Point(0, 0));
    if (isInside(tableSettings, x, y) && !isDefender) {
      const sprite = event.currentTarget as Draggable;
      sprite.dragging = false;
      sprite.data = null;
      addCard(gameId, playerId, card);
    }
  };

export const onDragMove = (event: PIXI.InteractionEvent) => {
  const sprite = event.currentTarget as Draggable;
  if (sprite.dragging) {
    const newPosition = sprite.data!.getLocalPosition(sprite.parent);
    sprite.x = newPosition.x;
    sprite.y = newPosition.y;
  }
};
