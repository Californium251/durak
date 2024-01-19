import React, { FC, useEffect, useRef, useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import { CardType } from "@/utils/Types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/slices";
import "@pixi/events";
import { setCardSize, showCard } from "@/slices/uiSlice";
import { onDragStart, onDragEnd, onDragMove, isInside } from "./utils";
import { getDefender } from "@/utils/utils";

const Card: FC<{
  card: CardType;
  i?: number;
  playerId?: string;
  transport?: any;
}> = ({ card, i, playerId, transport }) => {
  const addCard = transport?.addCard;
  const cardSize = { width: 100, height: 150 };
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.authSlice.userId);
  const tableSettings = useSelector(
    (state: RootState) => state.uiSlice.tableSettings
  );
  const CardAppearance = useSelector(
    (state: RootState) => state.uiSlice.cards[`${card?.suit}-${card?.rank}`]
  );
  if (card.suit === "diamonds" && card.rank === "nine") {
    console.log(CardAppearance);
  }
  const gameId = useSelector((state: RootState) => state.gameSlice._id);
  const [cardX, setCardX] = useState<number>(CardAppearance?.left);
  const [cardY, setCardY] = useState<number>(CardAppearance?.top);
  const [hover, setHover] = useState<boolean>(false);
  const [interactive, setInteractive] = useState<boolean>(false);
  const tickerCouner = useRef<number>(0);
  const defender = getDefender(
    useSelector((state: RootState) => state.gameSlice.data)
  );
  const dragAndDropProps =
    CardAppearance?.state === "playersHand"
      ? {
          pointerdown: onDragStart,
          pointerup: onDragEnd({
            tableSettings,
            isDefender: defender.user._id === userId,
            addCard,
            gameId,
            playerId: playerId || "",
            card,
          }),
          pointerupoutside: onDragEnd({
            tableSettings,
            isDefender: defender.user._id === userId,
            addCard,
            gameId,
            playerId: playerId || "",
            card,
          }),
          pointermove: onDragMove,
        }
      : null;

  useEffect(() => {
    dispatch(setCardSize({ ...cardSize, card }));
    if (userId === playerId || CardAppearance?.state === "board") {
      dispatch(showCard({ card, shown: true }));
      setInteractive(true);
    }
  }, [card]);
  useTick((delta) => {
    if (hover && playerId === userId) {
      if (tickerCouner.current < 1) {
        tickerCouner.current += 0.1 * delta;
        setCardX(
          CardAppearance?.left + tickerCouner.current * CardAppearance?.dLeft
        );
        setCardY(
          CardAppearance?.top - tickerCouner.current * CardAppearance?.dTop
        );
      }
    } else {
      setCardX(CardAppearance?.left);
      setCardY(CardAppearance?.top);
      tickerCouner.current = 0;
    }
  });
  if (CardAppearance) {
    const { width, height, angle } = CardAppearance;
    return (
      <Sprite
        image={
          CardAppearance.shown
            ? `/cards/${card?.suit}-${card?.rank}.svg`
            : "/deck.svg"
        }
        width={width}
        height={height}
        x={cardX}
        y={cardY}
        angle={angle}
        anchor={{ x: 0.5, y: 0.5 }}
        interactive={interactive}
        onmouseenter={() => {
          setHover(true);
        }}
        onmouseleave={() => {
          setHover(false);
        }}
        {...dragAndDropProps}
      />
    );
  }
};

export default Card;
