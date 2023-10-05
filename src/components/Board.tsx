'use client'
import { FC, useEffect, useState } from "react";
import * as _ from "lodash";
import Deck from "./Deck";
import CardsOnTable from "./CardsOnTable";
import { useDispatch, useSelector } from "react-redux";
import Player from "./Player";
import { RootState } from "@/slices";
import PassButton from "./PassButton";
import DrawButton from "./DrawButton";
import { CardType } from "./Card";

export type CardBufferType = {
    playerId: string,
    card: CardType,
} | null;

const Board: FC = () => {
    const dispatch = useDispatch();
    const activePlayerId = useSelector((state: RootState) => state.gameSlice.activePlayerId);
    const players = useSelector((state: RootState) => state.gameSlice.players);
    const [cardBuffer, setCardBuffer] = useState<CardBufferType>(null);
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
                        <Player
                            playerId={p.playerId}
                            cardBuffer={{ playerId: p.playerId, card: null }}
                            setCardBuffer={setCardBuffer}
                        />
                        <DrawButton playerId={p.playerId} />
                    </div>
                ) )}
            </div>
            <CardsOnTable cardBuffer={cardBuffer} />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
            }}>
                <Player
                    playerId={activePlayerId as string}
                    cardBuffer={{ playerId: activePlayerId as string, card: null }}
                    setCardBuffer={setCardBuffer}
                />
                <PassButton playerId={activePlayerId as string} />
            </div>
        </div>
    )
}

export default Board;
