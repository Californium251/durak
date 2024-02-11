import {Graphics} from "@pixi/react";
import React, {FC, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/slices";
import {setTableSize} from '@/slices/uiSlice';
import Card from "@/components/game/Card/Card";
import Button from "./Button";
import {GameType} from "@/utils/Types";
import {TransportType} from "@/utils/Transport";


const Table: FC<{
    playerId: string,
    transport: TransportType
}> = ({transport, playerId}) => {
    const tableSettings = useSelector((state: RootState) => state.uiSlice.tableSettings);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            dispatch(setTableSize({
                x: window.innerWidth / 8,
                y: window.innerHeight / 8,
                width: window.innerWidth * 3 / 4,
                height: window.innerHeight * 3 / 4,
            }))
        }
        dispatch(setTableSize({
            x: window.innerWidth / 8,
            y: window.innerHeight / 8,
            width: window.innerWidth * 3 / 4,
            height: window.innerHeight * 3 / 4,
        }))
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerHeight, window.innerWidth]);
    const cardsOnTable = useSelector((state: RootState) => state.gameSlice.data.table);
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
            {cardsOnTable && cardsOnTable.map(([card1, card2]) => {
                return <>
                    {card1 && <Card card={card1} key={`${card1.suit}-${card1.rank}`}/>}
                    {card2 && <Card card={card2} key={`${card2.suit}-${card2.rank}`}/>}
                </>
            })}
            <Button transport={transport} playerId={playerId}/>
        </>
    );
};

export default Table;
