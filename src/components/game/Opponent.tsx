import { RootState } from "@/slices";
import React, { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { createFanOfCards } from "@/utils/utils";
import HiddenCard from "./HiddenCard";

const Opponent: FC<
  PropsWithChildren<{ playerId: string; playerPosition: number }>
> = ({ playerId, playerPosition }) => {
  const players = useSelector(
    (state: RootState) => state.gameSlice.data.players
  );
  const player = players.find((p) => p.user._id === playerId);
  const cards = player?.cards;
  const getAngle = (numberOfPlayers: number) => {
    switch (numberOfPlayers) {
      case 2:
        return 180;
      case 3:
      case 4:
        if (playerPosition === 1) {
          return 90;
        }
        if (playerPosition === 2) {
          return -90;
        }
        if (playerPosition === 3) {
          return 180;
        }
    }
  };
  return (
    <div
      id={playerId}
      style={{
        position: "relative",
        transform: `rotate(${getAngle(players.length)}deg)`,
        flex: 1,
      }}
    >
      {cards?.map((c, i, arr) => {
        const { left, top, alphaI } = createFanOfCards(i, arr);
        return (
          <HiddenCard
            key={i}
            style={{
              position: "absolute",
              top: `${top}px`,
              left: `${left + 100}px`,
              transform: `rotate(${alphaI(i)}deg`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Opponent;
