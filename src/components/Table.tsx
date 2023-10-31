'use client'
import { RootState } from "@/slices";
import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { beat } from "@/slices/gameSlice";
import { CardType, CardBufferType } from "@/utils/Types";
import useApi from "@/hooks/useApi";

const Table: FC<{
    cardBuffer: CardBufferType,
    setCardBuffer: Dispatch<SetStateAction<CardBufferType>>,
}> = ({ cardBuffer, setCardBuffer }) => {
    const { beat } = useApi();
    const table = useSelector((state: RootState) => state.gameSlice.table);
    const onClick = (card1: CardType) => () => {
        if (cardBuffer !== null) {
            beat(card1, cardBuffer.card);
            setCardBuffer(null);
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
            table?.map((card, i) => (
                <div key={i} style={{
                    position: 'relative',
                    marginRight: '30px',
                }}>
                    <Card suit={card[0] ? card[0].suit : ''} rank={card[0] ? card[0].rank : ''} onClick={onClick(card[0])} />
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

export default Table;
