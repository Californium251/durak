import React from 'react';
import App from '@/components/game/App';

const GamePage = ({ params }: { params: { id: string } }) => {
    return (
        <App />
    );
};

export default GamePage;
