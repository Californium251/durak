import React, { FC, PropsWithChildren } from 'react';
import { AuthProvider } from './AuthContext';
import { ReduxProvider } from './reduxProvider';

const ParentContext: FC<PropsWithChildren> = ({ children }) => {
    return (<AuthProvider>
        <ReduxProvider>
            {children}
        </ReduxProvider>
    </AuthProvider>);
};

export default ParentContext;
