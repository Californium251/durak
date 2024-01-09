"use client";
import React from "react";
import JoinGameForm from "@/components/JoinGameForm/JoinGameForm";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import EnterNameForm from "@/components/create.game/EnterNameForm";

const JoinGamePage = () => {
  const { auth } = useAuth();
  return <>{auth.token ? <JoinGameForm /> : <EnterNameForm />}</>;
};

export default JoinGamePage;
