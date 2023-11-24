import React, { useState } from 'react';
import { RootState } from '../../../slices/index';
import { useSelector } from 'react-redux';
import Deck from '../Deck';
import { CardBufferType } from '../../../utils/Types';
import Player from '../Player';
import Table from '../Table';
import useAuth from '@/hooks/useAuth';


const Board = () => {
    const { userId } = useAuth().auth;
    const attackerId = useSelector((state: RootState) => state.gameSlice.data.attackerId);
    const [cardBuffer, setCardBuffer] = useState<CardBufferType>(null);
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Table cardBuffer={cardBuffer} setCardBuffer={setCardBuffer} />
                <Deck />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
            }}>
                <Player
                    playerId={userId as string}
                    setCardBuffer={setCardBuffer}
                />
            </div>
        </>
    );
};

export default Board;