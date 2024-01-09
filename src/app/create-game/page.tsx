"use client";
import CreateGameForm from "@/components/create.game/CreateGameForm";
import useAuth from "@/hooks/useAuth";
import EnterNameForm from "@/components/create.game/EnterNameForm";
import MainContainer from "@/components/main.page/Container";

const CreateGamePage = () => {
  const { auth } = useAuth();
  return (
    <MainContainer>
      {auth.token ? <CreateGameForm /> : <EnterNameForm />}
    </MainContainer>
  );
};

export default CreateGamePage;
