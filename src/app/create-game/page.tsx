'use client'
import CreateGameForm from "@/components/create.game/CreateGameForm";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import EnterNameForm from "@/components/create.game/EnterNameForm";
import { Container } from "react-bootstrap";

const CreateGamePage = () => {
    const { auth } = useAuth();
    return (
        <Container fluid className='d-flex align-items-center justify-content-center' style={{ height: '100vh'}}>
            {auth.token ? <CreateGameForm /> : <EnterNameForm />}
        </Container>
    );
}

export default CreateGamePage;
