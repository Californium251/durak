"use client";
import { FC, useEffect, useRef, useState } from "react";
import BoardLayout from "./Board/BoardLayout";
import { ApiProvider } from "@/context/ApiContext";
import { GameType } from "@/utils/Types";
import { useDispatch } from "react-redux";
import { getGame } from "@/slices/gameSlice";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import Transport from "@/utils/Transport";
import { socket } from "@/utils/socket";
import EnterNameForm from "../create.game/EnterNameForm";
import { setPlayerId } from "@/slices/animationSlice";
import { setUserId } from "@/slices/authSlice";

const App: FC = () => {
  const serverUrl =
    process.env.NEXT_PUBLIC_SOCKET_IO_URL || "http://localhost:3001";
  const transport = new Transport();
  const { auth, logout } = useAuth();
  const path = usePathname();
  const dispatch = useDispatch();
  
  socket.on("addCard", async (data) => {
    const parsedData = JSON.parse(data);
    dispatch(setPlayerId(parsedData.playerId));
    dispatch(getGame(parsedData.newGame));
  });
  socket.on("beat", async (data) => {
    dispatch(getGame(data));
  });
  socket.on("pass", async (data) => {
    dispatch(getGame(data));
  });
  socket.on("pickUp", async (data) => {
    dispatch(getGame(data));
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${serverUrl}/check-auth`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
        logout();
      }
    };
    if (!auth.token) return;
    const getGameData = async () => {
      const id = path.split("/").at(-1);
      const { data } = await axios.get(`${serverUrl}/get-game`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: { id },
      });
      dispatch(getGame(data as GameType));
    };
    checkAuth().then(getGameData);
  }, [path]);
  if (!auth.token) {
    return <EnterNameForm />;
  }
  dispatch(setUserId(auth.userId));
  return (
    <ApiProvider transport={transport}>
      <BoardLayout />
    </ApiProvider>
  );
};

export default App;
