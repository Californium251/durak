'use client'
import Image from "next/image";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../slices/index";
import Card from "./Card";

const Deck: FC = () => {
    const cards = useSelector((state: RootState) => state.gameSlice.cards);
    const trumpDrawn = useSelector((state: RootState) => state.gameSlice.trumpDrawn);
    const trump = useSelector((state: RootState) => state.gameSlice.trump);
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', width: '100%' }}>
            {cards.length > 0 && <Image src="/deck.svg" width="100" height="150" alt="deck" />}
            {!trumpDrawn && <Card suit={trump ? trump.suit : ''} rank={trump ? trump.rank : ''} />}
        </div>
    )
};

export default Deck;
