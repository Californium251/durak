import * as PIXI from "pixi.js";
import { getTable } from "./getTable";
import { getOnDragEnd } from "./getDnD";
import { setCardPosition } from "./setCardPosition";
import { CardType, GameDataType } from "@/utils/Types";

export const init = (divRef: { current: HTMLElement }, cards: CardType[]) => {
  const app = new PIXI.Application({
    backgroundColor: "#222",
    resizeTo: window,
  });
  if (divRef.current) {
    divRef.current.appendChild(app.view);
  }

  const table = getTable(app);

  const onDragEnd = getOnDragEnd(app, table);

  app.stage.addChild(table);

  cards?.map(setCardPosition(app));

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.on("pointerup", onDragEnd);
  app.stage.on("pointerupoutside", onDragEnd);
};
