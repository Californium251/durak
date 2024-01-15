import React, { FC, PropsWithChildren } from "react";
import { ReactReduxContext } from "react-redux";

export const ContextBridge: FC<
  PropsWithChildren<{
    Context: typeof ReactReduxContext;
    render: (value: React.ReactElement) => React.ReactElement;
  }>
> = ({ children, Context, render }) => {
  return (
    <Context.Consumer>
      {(value) =>
        render(<Context.Provider value={value}>{children}</Context.Provider>)
      }
    </Context.Consumer>
  );
};
