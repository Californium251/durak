'use client'
import { FC, useState } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { CardType } from "./Card";
import { RootState } from "../slices/index";
import { makeTurn, addCardToBuffer } from "@/slices/gameSlice";

export type PlayerType = {
    playerId: string,
    cards: CardType[],
}

const Player: FC<{ playerId: string }> = ({ playerId }) => {
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
    const cardBuffer = useSelector((state: RootState) => state.gameSlice.cardBuffer);
    const onClick = (card: CardType) => () => {
        if (playerId === activePlayerId) {
            dispatch(makeTurn(card));
        }
        if (playerId === defendingPlayer.playerId) {
            dispatch(addCardToBuffer(card));
        }
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                maxWidth: '900px',
                flexWrap: 'wrap',
            }}
        >{
            player.cards.map((c, i) => <Card key={i} suit={c.suit} rank={c.rank} onClick={onClick(c)} />)
        }</div>
    )
}

export default Player;
