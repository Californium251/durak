import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/slices';
import Link from 'next/link';

const PostBoard = () => {
    const gameFinished = useSelector((state: RootState) => state.gameSlice.data.gameFinished);
    const looser = useSelector((state: RootState) => state.gameSlice.data.players.find((p) => p.cards.length > 0));
    return (<div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }}>
        <h1>
            Game finished
        </h1>
        {gameFinished && <div>
            Looser: {looser?.user.name}
        </div>}
        <Link href={'/'}>
            <button>Back to lobby</button>
        </Link>
    </div>);
};

export default PostBoard;