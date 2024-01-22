'use client'
import { CardType } from "./Types";
import { socket } from './socket';
import { Socket } from 'socket.io-client';

const promisify = (asyncFn: any) => (...args: any) => {
    const promise = new Promise((resolve, reject) => {
        asyncFn.call(socket, ...args, (data: any, err: any) => (err ? reject(err) : resolve(data)));
    });
    return promise;
};

export type TransportType = {
    initGame: (gameId: string) => Promise<any>;
    pass: (gameId: string, playerId: string) => Promise<any>;
    pickUp: (gameId: string, playerId: string) => Promise<any>;
    addCard: (gameId: string, playerId: string, card: CardType) => Promise<any>;
    beat: (gameId: string, card1: CardType, card2: CardType, playerId: string) => Promise<any>;
}

class Transport implements TransportType {
    initGame = (gameId: string) => {
        return promisify(socket.emit)('initGame', gameId);
    }
    pass = (gameId: string, playerId: string) => {
        return promisify(socket.emit)('pass', { gameId, playerId });
    }
    pickUp = (gameId: string, playerId: string) => {
        return promisify(socket.emit)('pickUp', { gameId, playerId });
    }   
    addCard = (gameId: string, playerId: string, card: CardType) => {
        return promisify(socket.emit)('addCard', { gameId, playerId, card })
    }
    beat = (gameId: string, card1: CardType, card2: CardType, playerId: string) => {
        return promisify(socket.emit)('beat', { gameId, card1, card2, playerId });
    }
};

export default Transport;
