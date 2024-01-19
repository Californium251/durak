"use client";
import { RootState } from "../../../slices/index";
import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../OldCard";
import { CardType, CardBufferType } from "../../../utils/Types";
import useApi from "../../../hooks/useApi";
import "./table.css";
import useAuth from "@/hooks/useAuth";

const Table: FC<{
  cardBuffer: CardBufferType;
  setCardBuffer: Dispatch<SetStateAction<CardBufferType>>;
}> = ({ cardBuffer, setCardBuffer }) => {
  const cardAddInitiator = useSelector(
    (state: RootState) => state.animationSlice.playerId
  );
  const { userId } = useAuth().auth;
  const cardToAdd = document.getElementById(
    useSelector((state: RootState) => state.animationSlice.cardToAdd) as string
  );
  const getStartPosition = (playerId: string | null) => {
    const cardPosition = cardToAdd?.getBoundingClientRect() || {
      top: 0,
      left: 0,
    };
    const cardRotate = cardToAdd?.style.transform;
    const cardPairContainer = Array.from(
      document.querySelectorAll("#table > div")
    )
      .at(-1)
      ?.getBoundingClientRect();

    const tablePosition = document
      .getElementById("table")
      ?.getBoundingClientRect() || { top: 0, left: 0, right: 0 };
    const startPositionY = cardPairContainer?.top || tablePosition?.top;
    const startPositionX =
      cardPairContainer?.left ||
      tablePosition?.left + (tablePosition?.right - tablePosition?.left) / 2;
    if (playerId === userId) {
      return {
        top: cardPosition.top - startPositionY,
        left: cardPosition.left - startPositionX,
        cardRotate,
      };
    }
    const playerElement = document.getElementById(playerId as string);
    const playerPosition = playerElement?.getBoundingClientRect() || {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    return {
      top: playerPosition?.top - startPositionY,
      left: playerPosition?.left - startPositionX,
      cardRotate: "rotate(0deg)",
    };
  };
  const { top, left, cardRotate } = getStartPosition(cardAddInitiator);
  const gameId = useSelector((state: RootState) => state.gameSlice._id);
  const trump = useSelector((state: RootState) => state.gameSlice.data.trump);
  const { beat } = useApi();
  const table = useSelector((state: RootState) => state.gameSlice.data.table);
  const onClick = (card1: CardType) => () => {
    if (cardBuffer !== null) {
      beat(
        gameId as string,
        card1,
        cardBuffer.card,
        trump,
        cardBuffer.playerId
      );
      setCardBuffer(null);
    }
  };
  return (
    <div id="table">
      {table?.map((card, i) => (
        <div className="cardPair" id={`cardPair-${i}`} key={i}>
          <Card
            suit={card[0] ? card[0].suit : ""}
            rank={card[0] ? card[0].rank : ""}
            onClick={onClick(card[0])}
            className="card-on-table"
          />
          {card[1] && (
            <div className="cardWrapper">
              <Card
                suit={card[1].suit}
                rank={card[1].rank}
                className="card-on-table"
              />
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes appear {
          from {
            top: ${top}px;
            left: ${left}px;
            transform: ${cardRotate};
          }
          to {
            top: 0;
            left: 0;
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Table;
