"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import useAuth from "@/hooks/useAuth";
import Stage from "./Stage";
import NewPlayer from "./Player";
import { setPlayersAnchorPoints } from "@/slices/uiSlice";
import { useDispatch } from "react-redux";
import Table from "./Table";
import useApi from "@/hooks/useApi";

const NewBoard = () => {
  const userId = useAuth().auth.userId || "";
  const transport = useApi();
  const players = useSelector(
    (state: RootState) => state.gameSlice.data.players
  );
  const playersAnchorPoints = useSelector(
    (state: RootState) => state.uiSlice.playersAnchorPoints
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      dispatch(
        setPlayersAnchorPoints({
          playersIds: players.map((p) => p.user._id),
          userId,
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
      options={{ backgroundColor: 0x0000 }}
    >
      <Table />
      {playersAnchorPoints[userId] &&
        players.map((player, i) => {
          return (
            <NewPlayer
              position={[
                playersAnchorPoints[player.user._id].x,
                playersAnchorPoints[player.user._id].y,
              ]}
              angle={playersAnchorPoints[player.user._id].angle}
              key={i}
              playerId={player.user._id}
              transport={transport}
            />
          );
        })}
    </Stage>
  );
};

export default NewBoard;