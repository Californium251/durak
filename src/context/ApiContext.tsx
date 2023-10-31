'use client'
import React from 'react';
import { CardType } from '@/utils/Types';
import { createContext } from 'react';

const ApiContext = createContext({
    pass: (playerId: string) => { },
    pickUp: () => { },
    addCard: (playerId: string, card: CardType) => { },
    beat: (card1: any, card2: any) => { }
});

export default ApiContext

export function ApiProvider({ transport, children }) {
    return <ApiContext.Provider value={transport}>
        {children}
    </ApiContext.Provider>
};