import React, { FC, useRef, useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import { CardType } from "@/utils/Types";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import "@pixi/events";

const NewCard: FC<{
  card: CardType;
  i?: number;
}> = ({ card, i }) => {
  const cardCoors = useSelector(
    (state: RootState) =>
      state.uiSlice.playersCards[`${card?.suit}-${card?.rank}`]
  );
  const [cardX, setCardX] = useState<number>(cardCoors?.left);
  const [cardY, setCardY] = useState<number>(cardCoors?.top);
  const [hover, setHover] = useState<boolean>(false);
  const tickerCouner = useRef<number>(0);
  useTick((delta) => {
    if (hover) {
      if (tickerCouner.current < 1) {
        tickerCouner.current += 0.1 * delta;
        setCardX(cardCoors?.left + tickerCouner.current * cardCoors?.dLeft);
        setCardY(cardCoors?.top - tickerCouner.current * cardCoors?.dTop);
      }
    } else {
      setCardX(cardCoors?.left);
      setCardY(cardCoors?.top);
      tickerCouner.current = 0;
    }
  });
  if (cardCoors) {
    return (
      <Sprite
        image={`/cards/${card?.suit}-${card?.rank}.svg`}
        width={100}
        height={150}
        x={cardX}
        y={cardY}
        angle={cardCoors.alphaI(i)}
        anchor={{ x: 0.5, y: 0.5 }}
        interactive={true}
        onmouseenter={() => {
          setHover(true);
        }}
        onmouseleave={() => {
          setHover(false);
        }}
      />
    );
  }
};

export default NewCard;
