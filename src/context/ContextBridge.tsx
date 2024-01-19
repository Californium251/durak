import React, { FC, PropsWithChildren } from "react";

export const ContextBridge: FC<
  PropsWithChildren<{
    Context: React.Context<any>;
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
