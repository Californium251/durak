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
import { usePathname } from 'next/navigation';
import { GameType, PlayerType } from '@/utils/Types';

const PreBoard = () => {
    const serverUrl = process.env.NEXT_PUBLIC_SOCKET_IO_URL || 'http://localhost:3001';
    const path = usePathname();
    const dispatch = useDispatch()
    const { auth } = useAuth();
    const { token } = auth;
    useEffect(() => {
        const getGameData = async () => {
            const id = path.split('/').at(-1);
            const { data } = await axios.get(`${serverUrl}/get-game`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { id },
            });
            if (!data.data.players
                .filter((p: PlayerType) => !!p.user)
                .map((p: PlayerType) => p.user._id).includes(auth.userId)
            ) {
                const res = await axios.post(`${serverUrl}/join-game`,
                    {
                        gameId: id,
                        name: auth.name,
                        userId: auth.userId,
                    },
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${auth.token}`,
                        }
                    });
                dispatch(getGame(res.data));
            } else {
                dispatch(getGame(data as GameType));
            }
        };
        const timeout = setInterval(getGameData, 2000);
        return () => clearInterval(timeout);
    }, [dispatch, path, serverUrl, token]);
    const { players } = useSelector((state: RootState) => state.gameSlice.data);
    const { _id } = useSelector((state: RootState) => state.gameSlice);
    const { initGame } = useApi();
    const roomIsFull = players.every(p => p.user !== null);
    const makeReady = async () => {
        const res = await axios.post(`${serverUrl}/ready`, {
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
                    <PlayersAvatar key={i} name={p.user ? p.user.name : 'No player yet'} />
                ))}
            </div>
            <button style={{ width: '200px' }} disabled={!roomIsFull} onClick={makeReady}>Готов</button>
        </div>
    );
};

export default PreBoard;