"use client";
import { FC, SetStateAction, Dispatch, useState } from "react";
import Card from "./OldCard";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/index";
import PassButton from "./PassButton";
import PickUpButton from "./PickUpButton";
import { CardType, CardBufferType } from "../../utils/Types";
import useApi from "../../hooks/useApi";
import { PlayerType } from "../../utils/Types";
import { createFanOfCards } from "../../utils/utils";
import { getDefender } from "../../utils/utils";
import { setCard } from "@/slices/animationSlice";
import { useDispatch } from "react-redux";

const Player: FC<{
  playerId: string;
  setCardBuffer: Dispatch<SetStateAction<CardBufferType>>;
}> = ({ playerId, setCardBuffer }) => {
  const dispatch = useDispatch();
  const { addCard } = useApi();
  const [cardIsLoading, setCardIsLoading] = useState<boolean>(false);
  const gameId = useSelector((state: RootState) => state.gameSlice._id);
  const { attackerId, playersPassed } = useSelector(
    (state: RootState) => state.gameSlice.data
  );
  const { allPlayersCanAdd } = useSelector(
    (state: RootState) => state.gameSlice.data
  );
  const players = useSelector(
    (state: RootState) => state.gameSlice.data.players
  ).filter((p) => p.isPlaying);
  const player: PlayerType = players.find(
    (p) => p.user._id === playerId
  ) as PlayerType;
  const defender = getDefender(
    useSelector((state: RootState) => state.gameSlice.data)
  );
  const onClick = (card: CardType) => () => {
    setCardIsLoading(true);
    dispatch(setCard(`${card?.suit}-${card?.rank}`));
    if (!cardIsLoading) {
      if (playerId === defender.user._id) {
        setCardBuffer({ playerId, card });

      } else {
        addCard(gameId, playerId, card);
      }
      setCardIsLoading(false);
    }
  };
  const playersName = players.find((p) => p.user._id === playerId)?.user.name;
  const [cardHover, setCardHover] = useState<CardType>(null);
  const passAllowed = useSelector((state: RootState) => {
    if (playerId === defender.user._id) {
      return false;
    }
    if (allPlayersCanAdd && !playersPassed.includes(playerId)) {
      return true;
    }
    if (
      playerId === attackerId &&
      playersPassed.includes(attackerId as string)
    ) {
      return false;
    }
    if (playerId === attackerId) {
      return true;
    }
    if (
      playerId !== attackerId &&
      playersPassed.includes(attackerId as string)
    ) {
      return true;
    }
    return false;
  });
  return (
    <div
      id={playerId}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        border: `${
          playerId === attackerId
            ? "1px solid black"
            : playerId === defender.user._id
            ? "1px solid red"
            : "none"
        }`,
        height: "230px",
        width: "400px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "300px",
        }}
        onMouseLeave={() => setCardHover(null)}
      >
        {player &&
          player.cards.map((c, i, arr) => {
            const { top, left, dTop, dLeft, alphaI } = createFanOfCards(i, arr);
            return (
              <Card
                key={i}
                suit={c ? c.suit : ""}
                rank={c ? c.rank : ""}
                onClick={onClick(c)}
                style={{
                  position: "absolute",
                  top: c === cardHover ? `${top - dTop}px` : `${top}px`,
                  left:
                    c === cardHover
                      ? `${left + dLeft + 100}px`
                      : `${left + 100}px`,
                  transform: `rotate(${alphaI(i)}deg`,
                  transition: "top 0.2s ease-in-out, left 0.2s ease-in-out",
                }}
                onMouseEnter={() => setCardHover(c)}
              />
            );
          })}
      </div>
      <div
        style={{
          display: "row",
          flexDirection: "column",
        }}
      >
        {passAllowed && (
          <PassButton playerId={playerId} disabled={!passAllowed} />
        )}
        {playerId === defender.user._id && <PickUpButton playerId={playerId} />}
        <div
          style={{
            paddingBottom: "10px",
          }}
        >
          {playersName}
        </div>
      </div>
    </div>
  );
};

export default Player;
