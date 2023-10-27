'use client'
import { FC, useState } from "react";
import * as _ from "lodash";
import Deck from "./Deck";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import Player from "./Player";
import { RootState } from "@/slices";
import { CardType } from "./Card";

export type CardBufferType = {
    playerId: string,
    card: CardType,
} | null;

const Board: FC = () => {
    const dispatch = useDispatch();
    const activePlayerId = useSelector((state: RootState) => state.gameSlice.activePlayerId);
    const players = useSelector((state: RootState) => state.gameSlice.players);
    const playerIds = players.map(({ playerId }) => playerId);
    const [cardBuffer, setCardBuffer] = useState<CardBufferType>(null);
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#129912',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
            }}>
                {players.filter((p) => !p.activePlayer).map((p, i) => (
                    <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
                        <Player
                            playerId={p.playerId}
                            cardBuffer={{ playerId: p.playerId, card: null }}
                            setCardBuffer={setCardBuffer}
                        />
                    </div>
                ) )}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Table cardBuffer={cardBuffer} setCardBuffer={setCardBuffer} />
                <Deck />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
            }}>
                {players.filter((p) => p.activePlayer).map((p, i) => (
                    <div key={i}>
                        <Player
                            playerId={p.playerId as string}
                            cardBuffer={{ playerId: activePlayerId as string, card: null }}
                            setCardBuffer={setCardBuffer}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Board;
