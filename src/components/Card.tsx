import React, { FC } from "react";
import Image from "next/image";

export type CardType = {
    suit: string,
    rank: string,
    onClick?: () => void,
}

const Card: FC<CardType> = ({ suit, rank, onClick = () => {} }) => {
    return (
        <Image src={`/cards/${suit}-${rank}.svg`} alt={`${suit}-${rank}`} width="100" height="150" onClick={onClick} />
    )
}

export default Card;
