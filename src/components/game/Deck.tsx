"use client";
import Image from "next/image";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/index";
import Card from "./OldCard";

const Deck: FC = () => {
  const cards = useSelector((state: RootState) => state.gameSlice.data.cards);
  const trumpDrawn = useSelector(
    (state: RootState) => state.gameSlice.data.trumpDrawn
  );
  const trump = useSelector((state: RootState) => state.gameSlice.data.trump);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        width: "100%",
      }}
    >
      {cards.length > 0 && (
        <Image
          src="/deck.svg"
          width="100"
          height="150"
          alt="deck"
          style={{ zIndex: 2 }}
        />
      )}
      {!trumpDrawn && (
        <Card
          suit={trump ? trump.suit : ""}
          rank={trump ? trump.rank : ""}
          rotated={true}
        />
      )}
    </div>
  );
};

export default Deck;
