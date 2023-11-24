import React from 'react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import Container from './Container';

const MainPage = () => {
    const { auth, logout } = useAuth();
    const token = auth.token;
    return (<>
        <div>Main page</div>
        {!token
            ? <Container><Link href="/signup">Зарегистрироваться</Link>
                <Link href="/login">Войти</Link>
            </Container>
            : <Container><Link href='/create-game'>Создать игру</Link>
                <Link href='join-game'>Войти в игру</Link>
                <button onClick={logout}>Выйти</button></Container>}
    </>
    );
};

export default MainPage;
