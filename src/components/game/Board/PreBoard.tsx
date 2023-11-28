'use client'
import { RootState } from '@/slices';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PlayersAvatar from './PlayersAvatar';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { getGame } from '@/slices/gameSlice';
import useApi from '@/hooks/useApi';

const PreBoard = () => {
    const { players } = useSelector((state: RootState) => state.gameSlice.data);
    const { _id } = useSelector((state: RootState) => state.gameSlice);
    const { auth } = useAuth();
    const { initGame } = useApi();
    const dispatch = useDispatch();
    const roomIsFull = players.every(p => p.user !== null);
    const makeReady = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SOCKET_IO_URL}/ready`, {
            gameId: _id,
            userId: auth.userId,
        }, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            }
        });
        dispatch(getGame(res.data));
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}>
                {players.map((p, i) => (
                    <PlayersAvatar key={i} name={p.user ? p.user.email : 'No player yet'} />
                ))}
            </div>
            <button style={{ width: '200px' }} disabled={!roomIsFull} onClick={makeReady}>Готов</button>
        </div>
    );
};

export default PreBoard;