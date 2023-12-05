'use client'
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';

interface AuthContextType {
    auth: AuthType,
    login: ({ name, token }: AuthType) => void,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType>({
    auth: { token: null, name: null, userId: null },
    login: () => { },
    logout: () => { },
});

type AuthType = {
    token: string | null,
    name: string | null,
    userId: string | null,
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [auth, setAuth] = useState<AuthType>({ token: null, name: null, userId: null });
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        const name = window.localStorage.getItem('name');
        const userId = window.localStorage.getItem('userId');
        setAuth({ token, name, userId });
    }, [])
    const login = ({ name, token, userId }: AuthType) => {
        window.localStorage.setItem('name', name as string);
        window.localStorage.setItem('token', token as string);
        window.localStorage.setItem('userId', userId as string);
        setAuth({ token, name, userId });
    };
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('name');
        setAuth({ token: null, name: null, userId: null });
    };
    return <AuthContext.Provider value={{ auth, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;
