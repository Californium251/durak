'use client'
import { FC, SetStateAction, Dispatch, useEffect } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { CardType } from "./Card";
import { RootState } from "../slices/index";
import { addCard } from "@/slices/gameSlice";
import { CardBufferType } from "./Board";

export type PlayerType = {
    playerId: string,
    cards: CardType[],
    activePlayer?: boolean,
}

const Player: FC<{ 
    playerId: string, 
    cardBuffer: CardBufferType, 
    setCardBuffer: Dispatch<SetStateAction<CardBufferType>> 
}> = ({ playerId, cardBuffer, setCardBuffer }) => {
    const dispatch = useDispatch();
    const player: PlayerType = useSelector((state: RootState) => state.gameSlice.players.find((p) => p.playerId === playerId)) as PlayerType;
    const activePlayerId = useSelector((state: RootState) => state.gameSlice.activePlayerId);
    const defendingPlayer = useSelector((state: RootState) => {
        const activeIndex = state.gameSlice.players.findIndex((p) => p.playerId === activePlayerId);
        if (activeIndex + 1 === state.gameSlice.players.length) {
            return state.gameSlice.players[0];
        }
        return state.gameSlice.players[activeIndex + 1];
    });
    const onClick = (card: CardType) => () => {
        if (playerId === activePlayerId) {
            dispatch(addCard(card));
        }
        if (playerId === defendingPlayer.playerId) {
            setCardBuffer({ playerId, card });
        }
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                maxWidth: '900px',
                flexWrap: 'wrap',
            }}
        >{
            player.cards.map((c, i) => <Card key={i} suit={c ? c.suit : ''} rank={c ? c.rank : ''} onClick={onClick(c)} />)
        }</div>
    )
}

export default Player;
