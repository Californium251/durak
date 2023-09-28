'use client'
import Image from "next/image";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawCard } from "../slices/playersSlice";
import { shuffle, removeTopCard, getTrump, setTrumpDrawn } from "../slices/deckSlice";
import { RootState } from "../slices/index";
import Card from "./Card";

const Deck: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(shuffle());
        dispatch(getTrump());
    }, []);
    const cards = useSelector((state: RootState) => state.deckSlice.cards);
    const trump = useSelector((state: RootState) => state.deckSlice.trump);
    const hand = useSelector((state: RootState) => state.handSlice);
    const trumpDrawn = useSelector((state: RootState) => state.deckSlice.trumpDrawn);
    const onClickDraw = () => {
        if (cards.length > 0) {
            dispatch(drawCard(cards.at(-1)));
            dispatch(removeTopCard());
        } else if (cards.length === 0) {
            dispatch(drawCard(trump));
            dispatch(setTrumpDrawn());
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', width: '100%' }}>
            {cards.length > 0 && <Image src="/deck.svg" width="100" height="150" alt="deck" onClick={onClickDraw} />}
            {!trumpDrawn && <Card suit={trump.suit} rank={trump.rank} onClick={onClickDraw} />}
        </div>
    )
};

export default Deck;
