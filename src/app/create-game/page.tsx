'use client'
import CreateGameForm from "@/components/create.game/CreateGameForm";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const CreateGamePage = () => {
    const { auth } = useAuth();
    if (!auth.token) {
        return (
            <div>
                <h1>Create Game</h1>
                <p>You must be logged in to create a game.</p>
                <Link href='/'>Вернуться на главную</Link>
            </div>
        );
    }
    return (
        <div>
            <h1>Create Game</h1>
            <CreateGameForm />
        </div>
    );
}

export default CreateGamePage;
