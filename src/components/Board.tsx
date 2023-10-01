'use client'
import { FC, useEffect } from "react";
import * as _ from "lodash";
import Deck from "./Deck";
import CardsOnTable from "./CardsOnTable";
import { useDispatch, useSelector } from "react-redux";
import Player from "./Player";
import { RootState } from "@/slices";


const Board: FC = () => {
    const dispatch = useDispatch();
    const activePlayerId = useSelector((state: RootState) => state.gameSlice.activePlayerId);
    const players = useSelector((state: RootState) => state.gameSlice.players);
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#129912',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <div style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Deck />
                {players.filter((p) => p.playerId !== activePlayerId).map((p, i) => <Player key={i} playerId={p.playerId} /> )}
            </div>
            <CardsOnTable />
            <Player playerId={activePlayerId as string}  />
        </div>
    )
}

export default Board;
