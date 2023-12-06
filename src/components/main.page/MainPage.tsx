import React from 'react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import MainContainer from './Container';

const MainPage = () => {
    return (<>
        <MainContainer>
            <div>Главная страница</div>
            <Link href='/create-game'>Создать игру</Link>
            <Link href='join-game'>Войти в игру</Link>
        </MainContainer>
    </>);
};

export default MainPage;
