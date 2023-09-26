'use client'
import { FC } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { CardType } from "./Card";
import { RootState } from "../slices/index";
import { addCardToBeat } from "../slices/gameSlice";
import { makeTurn } from "../slices/handSlice";

const Hand: FC = () => {
    const cards: CardType[] = useSelector((state: RootState) => state.handSlice);
    const dispatch = useDispatch();
    const onClick = (card: CardType) => () => {
        dispatch(addCardToBeat(card));
        dispatch(makeTurn(card));
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
            cards.map((card, id) => (
                <Card
                    key={id}
                    suit={card.suit}
                    rank={card.rank}
                    onClick={onClick(card)}
                />)
            )
        }</div>
    )
}

export default Hand;
