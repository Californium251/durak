import React, { FC, useState } from "react";
import Image from "next/image";

const Card: FC<{ suit: string, rank: string }> = ({ suit, rank }) => {
    return (
        <Image src={`/cards/${suit}-${rank}.svg`} alt={`${suit}-${rank}`} width="100" height="150" />
    )
}

export default Card;
