import React, { FC, useEffect, useRef, useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import { CardType } from "@/utils/Types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/slices";
import "@pixi/events";
import { setCardSize, showCard } from "@/slices/uiSlice";
import { onDragStart, onDragEnd, onDragMove, isInside } from "./utils";
import { getDefender } from "@/utils/utils";
import { CardAppearanceType } from "@/utils/Types";

const Card: FC<{
  card: CardType;
  i?: number;
  playerId?: string;
  transport?: any;
}> = ({ card, i, playerId, transport }) => {
  const addCard = transport?.addCard;
  const beat = transport?.beat;
  const cardSize = { width: 100, height: 150 };
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.authSlice.userId);
  const tableSettings = useSelector(
    (state: RootState) => state.uiSlice.tableSettings
  );
  const CardAppearance = useSelector(
    (state: RootState) => state.uiSlice.cards[`${card?.suit}-${card?.rank}`]
  );
  const cardsOnTableStrings = useSelector(
    (state: RootState) => state.gameSlice.data.table
  ).map((cardPair) => `${cardPair[0]?.suit}-${cardPair[0]?.rank}`);
  const cardsOnTableAppearence = Object.entries(
    useSelector((state: RootState) => state.uiSlice.cards)
  )
    .filter(([cardName]) => {
      if (cardsOnTableStrings.includes(cardName)) {
        return true;
      }
      return false;
    })
    .reduce(
      (
        acc: { [index: string]: CardAppearanceType },
        [cardName, cardAppearance]
      ) => {
        acc[cardName] = cardAppearance;
        return acc;
      },
      {}
    );

  const gameId = useSelector((state: RootState) => state.gameSlice._id);
  const [cardX, setCardX] = useState<number>(CardAppearance?.x);
  const [cardY, setCardY] = useState<number>(CardAppearance?.y);
  const [hover, setHover] = useState<boolean>(false);
  const [interactive, setInteractive] = useState<boolean>(false);
  const tickerCouner = useRef<number>(0);
  const defender = getDefender(
    useSelector((state: RootState) => state.gameSlice.data)
  );
  const onDragEndOptions = {
    tableSettings,
    isDefender: defender.user._id === userId,
    addCard,
    beat,
    gameId,
    playerId: playerId || "",
    card,
    cardsOnTableUi: cardsOnTableAppearence,
    cardsOnTable: useSelector(
      (state: RootState) => state.gameSlice.data.table
    ).map((cardPair) => cardPair[0]),
  };
  const dragAndDropProps =
    CardAppearance?.state === "playersHand"
      ? {
          pointerdown: onDragStart,
          pointerup: onDragEnd(onDragEndOptions),
          pointerupoutside: onDragEnd(onDragEndOptions),
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
    // if (hover && playerId === userId) {
    //   if (tickerCouner.current < 1) {
    //     tickerCouner.current += 0.1 * delta;
    //     setCardX(
    //       CardAppearance?.x + tickerCouner.current * CardAppearance?.dLeft
    //     );
    //     setCardY(
    //       CardAppearance?.y - tickerCouner.current * CardAppearance?.dTop
    //     );
    //   }
    // } else {
    //   setCardX(CardAppearance?.x);
    //   setCardY(CardAppearance?.y);
    // }
    
    if (!hover && Math.abs(CardAppearance?.x - cardX) > 1) {
      const deltaX = Math.sign(CardAppearance.x - cardX);
      setCardX(cardX + 0.1 * delta * deltaX * CardAppearance.dLeft);
    }
    if (!hover && CardAppearance?.y !== cardY) {
      const deltaY = Math.sign(CardAppearance.y - cardY);
      setCardY(cardY + 0.1 * delta * deltaY * CardAppearance.dTop);
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
