import React, { FC, PropsWithChildren } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";

const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default MainContainer;
