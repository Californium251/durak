import {Container, Graphics, Sprite} from "@pixi/react";
import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setTable,
    positionCardsOnTable,
    positionCardsInHand,
} from "@/slices/uiSlice";
import {RootState} from "@/slices";
import Card from "./Card/Card";
import _uniqueId from "lodash/uniqueId";

const Table = () => {
    const cardsOnTable = useSelector(
        (state: RootState) => state.gameSlice.data.table
    );
    const userId = useSelector((state: RootState) => state.authSlice.userId);
    const cardsUi = useSelector((state: RootState) => state.uiSlice.cards);
    const dispatch = useDispatch();
    const initialTableSettings = {
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
        x: window.innerWidth * 0.1,
        y: window.innerHeight * 0.1,
    };
    useEffect(() => {
        dispatch(setTable(initialTableSettings));
    }, [window.innerWidth, window.innerHeight]);
    const tableSettings = useSelector(
        (state: RootState) => state.uiSlice.tableSettings
    );
    useEffect(() => {
        if (cardsOnTable.length === 0) return;
        dispatch(
            positionCardsOnTable({
                cards: cardsOnTable,
                windowWidth: tableSettings.width,
                windowHeight: tableSettings.height,
            })
        );
    }, [tableSettings]);
    const players = useSelector(
        (state: RootState) => state.gameSlice.data.players
    );
    useEffect(() => {
        players.forEach((player) => {
            dispatch(
                positionCardsInHand({
                    cards: player.cards,
                    userId,
                    playerId: player.user._id,
                })
            );
        });
    }, [players]);
    const rect = useCallback(
        (g: {
            clear: () => void;
            beginFill: (arg0: number) => void;
            drawRect: (arg0: number, arg1: number, arg2: number, arg3: number) => void;
            endFill: () => void;
        }) => {
            if (!tableSettings) return;
            const {width, height, x, y} = tableSettings;
            g.clear();
            g.beginFill(0x009900);
            g.drawRect(x, y, width, height);
            g.endFill();
        },
        [window.innerWidth, window.innerHeight, tableSettings]
    );

    return (
        <>
            <Graphics draw={rect}/>
            {cardsOnTable.map((card, i) => {
                if (card) {
                    return (
                        <>
                            <Card card={card[0]} key={i}/>
                            {card[1] ? <Card card={card[1]} key={`${i}-${2}`}/> : null}
                        </>
                    );
                }
            })}
        </>
    );
};

export default Table;
