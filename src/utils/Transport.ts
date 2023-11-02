'use client'
import { CardType } from "./Types";
import { socket } from './socket';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from "@socket.io/component-emitter";

const promisify = (asyncFn: any) => (...args: any) => {
    const promise = new Promise((resolve, reject) => {
        asyncFn.call(socket, ...args, (data: any, err: any) => (err ? reject(err) : resolve(data)));
    });
    return promise;
};

export type TransportType = {
    socket: Socket;
    pass: (playerId: string) => Promise<any>;
    pickUp: () => Promise<any>;
    addCard: (playerId: string, card: CardType) => Promise<any>;
    beat: (card1: CardType, card2: CardType) => Promise<any>;
}

class Transport implements TransportType {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    constructor(socket: any) {
        this.socket = socket;
    }
    pass(playerId: string) {
        return promisify(socket.emit)('pass', playerId);
    }
    pickUp() {
        return promisify(socket.emit)('pickUp');
    }
    addCard(playerId: string, card: CardType ) {
        return promisify(socket.emit)('addCard', { playerId, card })
    }
    beat(card1: CardType, card2: CardType) {
        return promisify(socket.emit)('beat', card1, card2);
    }
};

export default Transport;
