'use client'
import { RootState } from "@/slices";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card, { CardType } from "./Card";

const CardsToBeBeat: FC = () => {
    const dispatch = useDispatch();
    const cardsToBeat = useSelector((state: RootState) => state.gameSlice.cardsToBeat);
    return (
        <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            {cardsToBeat.map(({ suit, rank }: CardType, key) => <Card key={key} suit={suit} rank={rank} /> )}
        </div>
    )
}

export default CardsToBeBeat;
