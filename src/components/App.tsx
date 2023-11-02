'use client'
import { FC, useEffect } from "react";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices/index";
import Board from "./Board";
import { initializeGame } from "../slices/gameSlice";
import { CardType } from "../utils/Types";
import { PlayerType } from "./Player";
const cards = [
    { suit: 'hearts', rank: 'six' },
    { suit: 'hearts', rank: 'seven' },
    { suit: 'hearts', rank: 'eight' },
    { suit: 'hearts', rank: 'nine' },
    { suit: 'hearts', rank: 'ten' },
    { suit: 'hearts', rank: 'jack' },
    { suit: 'hearts', rank: 'queen' },
    { suit: 'hearts', rank: 'king' },
    { suit: 'hearts', rank: 'ace' },
    { suit: 'spades', rank: 'six' },
    { suit: 'spades', rank: 'seven' },
    { suit: 'spades', rank: 'eight' },
    { suit: 'spades', rank: 'nine' },
    { suit: 'spades', rank: 'ten' },
    { suit: 'spades', rank: 'jack' },
    { suit: 'spades', rank: 'queen' },
    { suit: 'spades', rank: 'king' },
    { suit: 'spades', rank: 'ace' },
    { suit: 'clubs', rank: 'six' },
    { suit: 'clubs', rank: 'seven' },
    { suit: 'clubs', rank: 'eight' },
    { suit: 'clubs', rank: 'nine' },
    { suit: 'clubs', rank: 'ten' },
    { suit: 'clubs', rank: 'jack' },
    { suit: 'clubs', rank: 'queen' },
    { suit: 'clubs', rank: 'king' },
    { suit: 'clubs', rank: 'ace' },
    { suit: 'diamonds', rank: 'six' },
    { suit: 'diamonds', rank: 'seven' },
    { suit: 'diamonds', rank: 'eight' },
    { suit: 'diamonds', rank: 'nine' },
    { suit: 'diamonds', rank: 'ten' },
    { suit: 'diamonds', rank: 'jack' },
    { suit: 'diamonds', rank: 'queen' },
    { suit: 'diamonds', rank: 'king' },
    { suit: 'diamonds', rank: 'ace' },
];

const shuffleDeck: (array: Array<CardType>) => Array<CardType> = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
const setTrump: (cards: Array<CardType>) => CardType = (cards) => cards.shift() as CardType;

const createPlayers: (n: number, cards: Array<CardType>) => Array<PlayerType> = (numberOfPlayers, deck) => {
    const res: Array<PlayerType> = [];
    for (let i = 1; i <= numberOfPlayers; i += 1) {
        const player = {
            playerId: _.uniqueId(),
            cards: deck.splice(0, 6),
            activePlayer: i === 1,
        }
        res.push(player);
    }
    return res;
};

const getFirstPlayerId: (p: PlayerType[]) => string = (players) => players.map((p) => p.playerId)[Math.floor(Math.random()*players.length)]

const WelcomeScreen: FC = () => {
    const playersCards = useSelector((state: RootState) => state.gameSlice.players).map((player) => player.cards);
    const deck = useSelector((state: RootState) => state.gameSlice.cards);
    const trumpDrawn = useSelector((state: RootState) => state.gameSlice.trumpDrawn);
    const table = useSelector((state: RootState) => state.gameSlice.table);
    useEffect(() => {
        const numberOfPlayersWithoutCards = playersCards.reduce((acc, hand) => {
            if (hand.length === 0) {
                acc += 1;
            }
            return acc;
        }, 0);
        const isGameOver = numberOfPlayersWithoutCards + 1 === playersCards.length && deck.length === 0 && trumpDrawn && table.length === 0;
    }, [...playersCards]);
    const dispatch = useDispatch();
    const gameStarted: boolean = useSelector((state: RootState) => state.gameSlice.gameStarted);
    const onClick = (val: number) => () => {
        const deck: Array<CardType> = shuffleDeck(cards);
        const players: Array<PlayerType> = createPlayers(val, deck);
        dispatch(initializeGame({
            cards: deck,
            trump: setTrump(deck),
            players: players,
            playersPassed: [],
            activePlayerId: getFirstPlayerId(players),
            gameStarted: true,
            table: [],
        }));
    }
    return <>
        {!gameStarted && <form
            style={{
                display: 'flex',
                width: '100%',
                height: '100hv',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1>Choose number of Players</h1>
            {[2,3,4,5].map((el, i) => (
                <button
                    type="button"
                    key={i}
                    onClick={onClick(el)}
                    style={{
                        width: '200px',
                        height: '80px',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        color: 'black',
                    }}
                >{el}</button>
            ))}
        </form>}
        {gameStarted && <Board />}
    </>
}

export default WelcomeScreen;
