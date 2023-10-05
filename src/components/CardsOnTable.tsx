'use client'
import { RootState } from "@/slices";
import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card, { CardType } from "./Card";
import { beatCard } from "@/slices/gameSlice";
import { CardBufferType } from "./Board";

const CardsOnTable: FC<{
    cardBuffer: CardBufferType,
}> = ({ cardBuffer }) => {
    const dispatch = useDispatch();
    const cardsOnTable = useSelector((state: RootState) => state.gameSlice.cardsOnTable);
    const onClick = (card1: CardType) => () => {
        if (cardBuffer !== null) {
            dispatch(beatCard({card1, card2: cardBuffer.card}));
        }
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
