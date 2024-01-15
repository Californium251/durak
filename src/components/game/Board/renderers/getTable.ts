import * as PIXI from "pixi.js";

export const getTable = (app: any) => {
  const tableColor = "rgb(42, 107, 91)";
  const table = new PIXI.Graphics();
  table.beginFill(tableColor);
  table.drawRect(
    app.screen.width / 4,
    app.screen.height / 4,
    app.screen.width / 2,
    app.screen.height / 2
  );
  return table;
};
