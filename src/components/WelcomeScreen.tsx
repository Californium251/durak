'use client'
import { FC } from "react";
import { changeGameStatus, setNumberOfPlayers } from "@/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/slices";
import Board from "./Board";

const WelcomeScreen: FC = () => {
    const dispatch = useDispatch();
    const gameStarted: boolean = useSelector((state: RootState) => state.gameSlice.gameStarted);
    const onClick = (val: number) => () => {
        dispatch(setNumberOfPlayers(val));
        dispatch(changeGameStatus(true));
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
            {[1,2,3,4,5].map((el, i) => (
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
        {
            gameStarted && <Board />
        }
    </>
}

export default WelcomeScreen;
