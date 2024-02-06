"use client";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/slices";
import Stage from "./Stage";
import Card from "@/components/game/Card/Card";
import _flatten from "lodash/flatten";
import useAuth from "@/hooks/useAuth";
import Table from "./Table";
import useApi from "@/hooks/useApi";

const Board = () => {
    const players = _flatten(useSelector((state: RootState) => state.gameSlice.data.players));
    const cards = useSelector((state: RootState) => state.gameSlice.data.cards);
    const trump = useSelector((state: RootState) => state.gameSlice.data.trump);
    const [stageSize, setStageSize] = useState({width: window.innerWidth, height: window.innerHeight})
    useEffect(() => {
        const handleResize = () => {
            setStageSize({width: window.innerWidth, height: window.innerHeight})
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerHeight, window.innerWidth]);
    const transport = useApi();
    const {auth: {userId}} = useAuth();
    if (!userId) throw new Error('This user doesn\'t exist or don\'t participate this game.');
    const allCards = [
        <Card key={`${trump?.suit}-${trump?.rank}`} card={trump} />,
        ..._flatten(players.map((p) => p.cards.map((card) =>
            <Card key={`${card?.suit}-${card?.rank}`} playerId={userId} card={card} transport={transport}/>))),
        ...cards.map((card) =>
            <Card key={`${card?.suit}-${card?.rank}`} card={card} />)];

    return <Stage
        width={stageSize.width}
        height={stageSize.height}
        options={{backgroundColor: 0x0000}}
    >
        {/*@ts-ignore*/}
        <Table transport={transport} playerId={userId} />
        {allCards}
    </Stage>;
};

export default Board;
