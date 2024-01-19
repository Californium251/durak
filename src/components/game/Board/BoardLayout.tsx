'use client'
import { FC } from "react";
import Board from "./Board";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import PostBoard from "./PostBoard";
import PreBoard from "./PreBoard";
import NewBoard from "./NewBoard";

const setBoard = (gameStarted: boolean, gameFinished: boolean) => {
    if (gameStarted && !gameFinished) {
        return <NewBoard />
    }
    if (gameFinished) {
        return <PostBoard />
    }
    return <PreBoard />
}

const BoardLayout: FC = () => {
    const gameStarted = useSelector((state: RootState) => state.gameSlice.data.gameStarted);
    const gameFinished = useSelector((state: RootState) => state.gameSlice.data.gameFinished);
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#129912',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            {setBoard(gameStarted, gameFinished)}
        </div>
    )
}

export default BoardLayout;
