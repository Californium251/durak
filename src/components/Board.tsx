'use client'
import { FC, useEffect } from "react";
import * as _ from "lodash";
import Deck from "./Deck";
import CardsOnTable from "./CardsOnTable";
import { useDispatch, useSelector } from "react-redux";
import Player from "./Player";
import { RootState } from "@/slices";
import PassButton from "./PassButton";
import DrawButton from "./DrawButton";

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
                {players.filter((p) => p.playerId !== activePlayerId).map((p, i) => (
                    <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
                        <Player playerId={p.playerId} />
                        <DrawButton playerId={p.playerId} />
                    </div>
                ) )}
            </div>
            <CardsOnTable />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
            }}>
                <Player playerId={activePlayerId as string}  />
                <PassButton playerId={activePlayerId as string} />
            </div>
        </div>
    )
}

export default Board;
