"use client";
import {FC, useCallback, useEffect, useMemo} from "react";
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

  useMemo(() => {
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
  }, []);

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
