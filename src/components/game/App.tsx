'use client'
import { FC, useEffect } from "react"
import BoardLayout from "./Board/BoardLayout"
import { ApiProvider } from "@/context/ApiContext"
import { GameType } from '@/utils/Types'
import { useDispatch } from "react-redux"
import { getGame } from "@/slices/gameSlice"
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import axios from "axios"
import Transport from "@/utils/Transport"
import { socket } from "@/utils/socket"

const App: FC = () => {
    const serverIrl = process.env.NEXT_PUBLIC_SOCKET_IO_URL || 'http://localhost:3001';
    const transport = new Transport();
    const { token } = useAuth().auth;
    const path = usePathname();
    const dispatch = useDispatch();
    socket.on('addCard', async (data) => {
        const parsedData = JSON.parse(await data);
        dispatch(getGame(parsedData));
    });
    socket.on('beat', async (data) => {
        dispatch(getGame(data));
    });
    socket.on('pass', async (data) => {
        dispatch(getGame(data));
    });
    socket.on('pickUp', async (data) => {
        dispatch(getGame(data));
    });
    
    useEffect(() => {
        if (!token) return;
        const getGameData = async () => {
            const id = path.split('/').at(-1);
            const { data } = await axios.get(`${serverIrl}/get-game`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { id },
            });
            dispatch(getGame(data as GameType));
        }
        getGameData();
    }, [token, path]);
    if (!token) {
        return (
            <div>
                <h1>Join Game</h1>
                <p>You must be logged in to join a game.</p>
                <Link href='/'>Вернуться на главную</Link>
            </div>
        );
    }
    return <ApiProvider transport={transport}>
        <BoardLayout />
    </ApiProvider>
}

export default App;
