'use client'
import React from 'react';
import { useFormik } from 'formik';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { createGame } from '@/slices/gameSlice';

const JoinGameForm = () => {
    const { auth } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            gameId: '',
            username: '',
        },
        onSubmit: async (values) => {
            const res = await axios.post('/join-game',
                {
                    ...values,
                    username: auth.email,
                    userId: auth.userId,
                },
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`,
                    }
                });
            dispatch(createGame(res.data));
            router.push(`/game/${res.data._id}`);
        },
    });
    return (auth.token &&
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='gameId'>Game ID: </label>
                <input
                    id='gameId'
                    name='gameId'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.gameId}
                />
                <button type='submit'>Join</button>
            </form>
        </div>
    );
};

export default JoinGameForm;