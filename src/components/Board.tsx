'use client'
import { FC, useEffect } from "react";
import * as _ from "lodash";
import Hand from "./Hand";
import Deck from "./Deck";
import CardsToBeBeat from "./CardsToBeBeat";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/slices";
import { createPlayer, drawCard } from "@/slices/playersSlice";
import { CardType } from "./Card";
import { setNumberOfPlayers } from "@/slices/gameSlice";


const Board: FC = () => {
    const dispatch = useDispatch();
    const players = useSelector((state: RootState) => state.playersSlice);
    const cards = useSelector((state: RootState) => state.deckSlice.cards);
    useEffect(() => {
        players.forEach((p) => {
            for (let i = 1; i <= 6; i += 1) {
                dispatch(drawCard({
                    playerId: p.playerId,
                    card: cards.at(-1) as CardType,
                }));
            }
        })
    }, [])
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
            <Deck />
            <CardsToBeBeat />
            {players.map(({ playerId }, i) => <Hand id={playerId} key={i} />)}
        </div>
    )
}

export default Board;
