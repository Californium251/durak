import { FC, PropsWithChildren, createContext, useState } from 'react';

interface AuthContextType {
    auth: AuthType,
    login: ({ username, token }: AuthType) => void,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType>({
    auth: { token: null, username: null },
    login: () => { },
    logout: () => { },
});

type AuthType = {
    token: string | null,
    username: string | null,
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username');
    const [auth, setAuth] = useState<AuthType>({ token, username });
    const login = ({ username, token }: AuthType) => {
        console.log('login', username, token);
        window.localStorage.setItem('username', username as string);
        window.localStorage.setItem('token', token as string);
        setAuth({ username, token });
        console.log('auth', auth)
    };
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        setAuth({ token: null, username: null });
    };
    return <AuthContext.Provider value={{ auth, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;
