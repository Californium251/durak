import React, { FC, PropsWithChildren, useMemo } from "react";
import Image from "next/image";
import { CardType } from "../../utils/Types";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";

const Card: FC<
  PropsWithChildren<
    CardType & {
      onMouseEnter?: () => void;
      className?: string;
      rotated?: boolean;
    }
  >
> = ({
  suit,
  rank,
  onClick = () => {},
  className,
  rotated = false,
  ...props
}) => {
  const trump = useSelector((state: RootState) => state.gameSlice.data.trump);
  const isTrump = useMemo(() => {
    return trump && trump.suit === suit && trump.rank === rank;
  }, [rank, suit, trump]);
  return (
    <>
      <Image
        {...props}
        src={`/cards/${suit}-${rank}.svg`}
        alt={`${suit}-${rank}`}
        width="100"
        height="150"
        onClick={onClick}
        className={rotated ? `${className} card trump` : `${className} card`}
        id={`${suit}-${rank}`}
      />
      <style>{`
        .trump {
          transform: rotate(90deg) translateY(50px);
        }
      `}</style>
    </>
  );
};

const CardMemo = React.memo(Card);

export default CardMemo;
