import React from 'react';
import axios from 'axios';
import App from '@/components/game/App';
import { ReduxProvider } from '@/context/reduxProvider';
require('dotenv').config()


const GamePage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const path =`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/get-game`;
    const game = await axios.get(path, {
        params: {
            id,
        },
    });
    return (
        <ReduxProvider>
            <App game={game.data} />
        </ReduxProvider >
    );
};

export default GamePage;
