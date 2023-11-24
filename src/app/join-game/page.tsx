'use client'
import React from 'react';
import JoinGameForm from '@/components/JoinGameForm/JoinGameForm';
import useAuth from "@/hooks/useAuth";
import Link from 'next/link';

const JoinGamePage = () => {
    const { auth } = useAuth();
    if (!auth.token) {
        return (
            <div>
                <h1>Join Game</h1>
                <p>You must be logged in to join a game.</p>
                <Link href='/'>Вернуться на главную</Link>
            </div>
        );
    }
    return (
        <div>
            <h1>Join Game</h1>
            <JoinGameForm />
        </div>
    );
};

export default JoinGamePage;