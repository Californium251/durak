import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";
import { createFanOfCards } from "@/utils/utils";

const HiddenCard: FC<{ style: object }> = ({ style }) => {
  return (
    <Image src="/deck.svg" alt="card" width="100" height="150" style={style} />
  );
};

export default HiddenCard;
