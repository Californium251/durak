import { RootState } from "@/slices";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Sprite } from "@pixi/react";
import { createFanOfCards } from "@/utils/utils";
import { PointLike } from "@/utils/Types";
import NewCard from "./NewCard";
import { useDispatch } from "react-redux";
import { positionCardsInHand } from "@/slices/uiSlice";

const NewPlayer: FC<{
  playerId: string;
  position: PointLike | undefined;
  angle: number;
}> = ({ playerId, position, angle }) => {
  const dispatch = useDispatch();
  const cards = useSelector(
    (state: RootState) =>
      state.gameSlice.data.players.find((p) => p.user._id === playerId)?.cards
  ) || [];
  useEffect(() => {
    dispatch(positionCardsInHand({ cards }));
  }, [cards]);
  return (
    <Container position={position} angle={angle}>
      {cards?.map((card, i, cards) => {
        const coors = createFanOfCards(i, cards);
        if (card) {
          return <NewCard card={card} i={i} key={i} />;
        }
      })}
    </Container>
  );
};

export default NewPlayer;
