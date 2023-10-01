'use client'
import { RootState } from "@/slices";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card, { CardType } from "./Card";
import { beatCard } from "@/slices/gameSlice";

const CardsOnTable: FC = () => {
    const dispatch = useDispatch();
    const cardsOnTable = useSelector((state: RootState) => state.gameSlice.cardsOnTable);
    const cardBuffer = useSelector((state: RootState) => state.gameSlice.cardBuffer);
    const onClick = (card: CardType) => () => {
        dispatch(beatCard(card));
    }
    return (
        <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >{
            cardsOnTable?.map((card, i) => (
                <div key={i} style={{
                    position: 'relative',
                    marginRight: '30px',
                }}>
                    <Card suit={card[0].suit} rank={card[0].rank} onClick={onClick(card[0])} />
                    {card[1] && <div style={{
                            position: 'absolute',
                            top: '25px',
                            left: '25px',
                    }}>
                        <Card suit={card[1].suit} rank={card[1].rank} />
                    </div>}
                </div>
            ))
        }</div>
    )
}

export default CardsOnTable;
