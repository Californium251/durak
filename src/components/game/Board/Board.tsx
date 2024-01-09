import React, { useState } from "react";
import { RootState } from "../../../slices/index";
import { useSelector } from "react-redux";
import Deck from "../Deck";
import { CardBufferType } from "../../../utils/Types";
import Player from "../Player";
import Table from "../Table/Table";
import useAuth from "@/hooks/useAuth";
import Opponent from "../Opponent";
import "./board.css";

const Board = () => {
  const { userId } = useAuth().auth;
  const [cardBuffer, setCardBuffer] = useState<CardBufferType>(null);
  const players = useSelector(
    (state: RootState) => state.gameSlice.data.players
  );
  const getGridTemplateAreas = (numberOfPlayers: number) => {
    if (numberOfPlayers === 2) {
      return `
                'deck player1'
                'deck table'
                'deck mainPlayer'
            `;
    }
    if (numberOfPlayers === 3) {
      return `
                "player1 deck player2"
                "player1 table player2"
                "player1 mainPlayer player2"
            `;
    }
    if (numberOfPlayers === 4) {
      return `
                "deck player3 player2"
                "player1 table player2"
                "player1 mainPlayer mainPlayer"
            `;
    }
  };
  const getGridTemplateColumns = (numberOfPlayers: number) => {
    if (numberOfPlayers === 2) {
      return "1fr 5fr";
    }
    return "1fr 3fr 1fr";
  };
  const restPlayers = players.filter((p) => p.user._id !== userId);
  return (
    <div
      className="board"
      style={{
        gridTemplateAreas: getGridTemplateAreas(players.length),
        gridTemplateColumns: getGridTemplateColumns(players.length),
      }}
    >
      <div className="deck-wrapper">
        <Deck />
      </div>
      {restPlayers.map((p, i) => (
        <div
          className="opponent-wrapper"
          style={{ gridArea: `player${i + 1}` }}
          key={i}
        >
          <Opponent playerId={p.user._id} playerPosition={i + 1} />
        </div>
      ))}
      <div className="table-wrapper">
        <Table cardBuffer={cardBuffer} setCardBuffer={setCardBuffer} />
      </div>
      <div className="main-player-wrapper">
        <Player playerId={userId as string} setCardBuffer={setCardBuffer} />
      </div>
    </div>
  );
};

export default Board;
