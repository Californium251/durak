"use client";
import React from "react";
import { CardType } from "../utils/Types";
import { createContext } from "react";
import { TransportType } from "../utils/Transport";

const ApiContext = createContext({
  initGame: (gameId: string) => Promise<any>,
  pass: (gameId: string, playerId: string) => Promise<any>,
  pickUp: (gameId: string, playerId: string) => Promise<any>,
  addCard: (gameId: string, playerId: string, card: CardType) => Promise<any>,
  beat: (
    gameId: string,
    card1: CardType,
    card2: CardType,
    trump: CardType,
    playerId: string
  ) => Promise<any>,
});

export default ApiContext;

export function ApiProvider({
  transport,
  children,
}: {
  transport: TransportType;
  children: React.ReactNode;
}) {
  return (
    <ApiContext.Provider value={transport}>{children}</ApiContext.Provider>
  );
}
