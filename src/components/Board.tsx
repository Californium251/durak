'use client'
import { FC } from "react";
import Hand from "./Hand";
import Deck from "./Deck";
import CardsToBeBeat from "./CardsToBeBeat";
import Card from "./Card";


const Board: FC = () => {
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
            <Hand />
        </div>
    )
}

export default Board;
