import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";
import { CardType } from "../../utils/Types";

const Card: FC<PropsWithChildren<CardType>> = ({ suit, rank, onClick = () => {}, ...props }) => {
    return (
        <Image
            {...props}
            src={`/cards/${suit}-${rank}.svg`}
            alt={`${suit}-${rank}`}
            width="100"
            height="150"
            onClick={onClick}
        />
    )
}

export default Card;
