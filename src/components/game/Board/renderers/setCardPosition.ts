import { CardType } from "../../../../utils/Types";
import { createFanOfCards } from "../../../../utils/utils";
import { getOnDragStart } from "./getDnD";
import * as PIXI from "pixi.js";

export const setCardPosition =
  (app: any) => (card: CardType, i: number, cards: CardType[]) => {
    if (card) {
      const canvasEl = PIXI.Sprite.from(`/cards/${card.suit}-${card.rank}.svg`);
      const coors = createFanOfCards(i, cards);
      canvasEl.width = 100;
      canvasEl.height = 150;
      canvasEl.x = app.screen.width / 2 + coors.left;
      canvasEl.y = (app.screen.height * 7) / 8 + coors.top;
      canvasEl.angle = coors.alphaI(i);
      canvasEl.anchor.set(0.5);
      canvasEl.on("pointerdown", getOnDragStart(app), canvasEl);
      canvasEl.eventMode = "static";
      app.stage.addChild(canvasEl);
    }
  };
