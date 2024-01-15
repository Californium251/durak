import { isInside } from "@/utils/utils";

let dragTarget: any = null;

function onDragMove(event: any) {
  if (dragTarget) {
    dragTarget.parent.toLocal(event.global, null, dragTarget.position);
  }
}

export const getOnDragStart = (app: any) =>
  function () {
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on("pointermove", onDragMove);
  };

export const getOnDragEnd = (app: any, table: any) =>
  function () {
    if (dragTarget && isInside(dragTarget, table)) {
      app.stage.off("pointermove", onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  };
