import React, { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({children}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {children}
        </div>
    );
};

export default Container;