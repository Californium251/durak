import React, { FC, PropsWithChildren } from "react";
import { Stage as PixiStage } from "@pixi/react";
import { ReactReduxContext } from "react-redux";
import { ContextBridge } from "@/context/ContextBridge";

interface StageProps extends PropsWithChildren<any> {
  width?: number;
  height?: number;
  options?: { backgroundColor: string };
}

const Stage: FC<StageProps> = ({ children, ...props }) => {
  return (
    <ContextBridge
      Context={ReactReduxContext}
      render={(children) => <PixiStage {...props}>{children}</PixiStage>}
    >
      {children}
    </ContextBridge>
  );
};

export default Stage;
