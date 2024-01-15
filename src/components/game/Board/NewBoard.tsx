"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import useAuth from "@/hooks/useAuth";
import Stage from "./Stage";
import NewPlayer from "./NewPlayer";
import { setPlayersAnchorPoints } from "@/slices/uiSlice";
import { useDispatch } from "react-redux";

const NewBoard = () => {
  const userId = useAuth().auth.userId;
  const players = useSelector(
    (state: RootState) => state.gameSlice.data.players
  );
  const playersAnchorPoints = useSelector(
    (state: RootState) => state.uiSlice.playersAnchorPoints
  );
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      dispatch(
        setPlayersAnchorPoints({
          numberOfPlayers: players.length,
          windowWidth,
          windowHeight,
        })
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{ backgroundColor: "#008B3A" }}
    >
      {playersAnchorPoints[0] &&
        players.map((player, i) => {
          return (
            <NewPlayer
              position={[playersAnchorPoints[i].x, playersAnchorPoints[i].y]}
              angle={playersAnchorPoints[i].angle}
              key={i}
              playerId={player.user._id}
            />
          );
        })}
    </Stage>
  );
};

export default NewBoard;
