import React, {useCallback, FC, useState, useEffect} from 'react';
import {Graphics, Text} from '@pixi/react';
import * as PIXI from '@pixi/react';
import {TransportType} from "@/utils/Transport";
import {useSelector} from "react-redux";
import {RootState} from "@/slices";
import {getDefender} from "@/utils/utils";

const Button: FC<{
    transport: TransportType,
    playerId: string
}> = ({transport, playerId}) => {
    const gameId = useSelector((state: RootState) => state.gameSlice._id);
    const attackerId = useSelector((state: RootState) => state.gameSlice.data.attackerId);
    const gameState = useSelector((state: RootState) => state.gameSlice.data);
    const table = useSelector((state: RootState) => state.gameSlice.data.table);

    const {pass, pickUp} = transport;
    const onClickPass = () => {pass(gameId, playerId)};
    const onClickPickUp = () => {pickUp(gameId, playerId)};

    const [buttonState, setButtonState] = useState({
        text: '',
        disabled: true,
        onclick: () => {}
    });

    const getButtonState = () => {
        const res = {
            text: '',
            disabled: true,
            onclick: () => {}
        };
        if (getDefender(gameState).user._id === playerId) {
            res.text = 'Взять';
            res.disabled = table.length === 0 || table.reduce((acc, cardPair) => {
                if (cardPair[0] && !cardPair[1]) acc = false;
                return acc;
            }, true);
            res.onclick = onClickPickUp;
        } else if (gameState.isPickingUp) {
            res.text = 'Пас';
            res.disabled = gameState.playersPassed.includes(playerId);
            res.onclick = onClickPass;
        } else {
            res.text = 'Бито';
            res.disabled = table.length === 0 || table.reduce((acc, cardPair) => {
                if (cardPair[0] && !cardPair[1]) acc = true;
                return acc;
            }, false);
            if (playerId !== attackerId) {
                res.disabled = res.disabled && gameState.allPlayersCanAdd;
            }
            res.onclick = onClickPass;
        }
        return res;
    };

    useEffect(() => {
        setButtonState(getButtonState());
    }, [gameState]);
    const button = useCallback((g: any) => {
        const color = buttonState.disabled ? 0x777777 : 0x11BB11;
        g.clear();
        g.beginFill(color);
        g.drawRect(window.innerWidth / 16, window.innerHeight * 9 / 11, 200, 75);
        g.endFill();
    }, [window.innerHeight, window.innerWidth, buttonState]);

    return (<>
            <Graphics draw={button} interactive={!buttonState.disabled} onclick={buttonState.onclick}/>
            <Text
                text={buttonState.text}
                x={window.innerWidth / 16 + 100}
                y={window.innerHeight * 9 / 11 + 75/2}
                anchor={{x: 0.5, y: 0.5}}/>
        </>
    );
};

export default Button;