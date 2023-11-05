'use client'
import { FC, useEffect } from "react"
import Board from "./Board"
import { ApiProvider } from "@/context/ApiContext"
import Transport from "@/utils/Transport"
import { socket } from "@/utils/socket"
import callbacks from "./appUtils"
import { GameType } from '@/utils/Types'
import { useDispatch } from "react-redux"
import { initializeGame } from "@/slices/gameSlice"

const { passCb, addCardCb, pickUpCb, beatCb } = callbacks;

socket.on('pass', passCb);
socket.on('addCard', addCardCb);
socket.on('pickUp', pickUpCb);
socket.on('beat', beatCb);
const transport = new Transport(socket);

const App: FC<{ game: GameType }> = ({ game }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeGame(game))
    }, []);
    return <ApiProvider transport={transport}>
        <Board />
    </ApiProvider>
}

export default App;
