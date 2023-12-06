import React, { FC, PropsWithChildren } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';


const MainContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Container className="d-flex justify-content-center align-items-center flex-column vh-100">
            {children}
        </Container>
    );
};

export default MainContainer;
