import { RootState } from "@/slices";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Sprite } from "@pixi/react";
import { PointLike } from "@/utils/Types";
import Card from "./Card/Card";
import { useDispatch } from "react-redux";
import { positionCardsInHand } from "@/slices/uiSlice";

const NewPlayer: FC<{
  playerId: string;
  position: PointLike | undefined;
  angle: number;
  transport: any;
}> = ({ playerId, position, angle, transport }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.authSlice.userId);
  const cards = useSelector(
    (state: RootState) =>
      state.gameSlice.data.players.find((p) => p.user._id === playerId)?.cards
  ) || [];
  useEffect(() => {
    dispatch(positionCardsInHand({ cards, userId, playerId }));
  }, [cards]);
  return (
    <Container position={position} angle={angle}>
      {cards?.map((card, i) => {
        if (card) {
          return <Card card={card} i={i} key={i} playerId={playerId} transport={transport} />;
        }
      })}
    </Container>
  );
};

export default NewPlayer;
