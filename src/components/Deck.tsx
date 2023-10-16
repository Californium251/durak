'use client'
import Image from "next/image";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices/index";
import Card, { CardType } from "./Card";

const Deck: FC = () => {
    const dispatch = useDispatch();
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
