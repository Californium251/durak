'use client'
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';

interface AuthContextType {
    auth: AuthType,
    login: ({ email, userId, token }: AuthType) => void,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType>({
    auth: { token: null, userId: null, email: null },
    login: () => { },
    logout: () => { },
});

type AuthType = {
    token: string | null,
    userId: string | null,
    email: string | null,
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [auth, setAuth] = useState<AuthType>({ token: null, email: null, userId: null });
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        const email = window.localStorage.getItem('email');
        const userId = window.localStorage.getItem('userId');
        setAuth({ token, email, userId });
    }, [])
    const login = ({ token, email, userId }: AuthType) => {
        window.localStorage.setItem('email', email as string);
        window.localStorage.setItem('token', token as string);
        window.localStorage.setItem('userId', userId as string);
        setAuth({ token, email, userId });
    };
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('userId');
        setAuth({ token: null, email: null, userId: null });
    };
    return <AuthContext.Provider value={{ auth, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;
