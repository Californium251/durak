'use client'
import { CardType } from "./Types";
import { socket } from '../app/page';

const promisify = (asyncFn) => (...args) => {
    const promise = new Promise((resolve, reject) => {
        asyncFn.call(socket, ...args, (data, err) => (err ? reject(err) : resolve(data)));
    });
    return promise;
};

class Transport {
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
