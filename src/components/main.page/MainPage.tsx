"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import MainContainer from "./Container";
import axios from "axios";
import CreateGameButton from "./CreateGameButton";
import "./main-page-styles.css";

const MainPage = () => {
  const { auth, logout } = useAuth();
  const serverUrl =
    process.env.NEXT_PUBLIC_SOCKET_IO_URL || "http://localhost:3001";
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
    checkAuth();
  }, []);
  return (
    <div className="page-container">
      <MainContainer>
        <div className="header-wrapper">
          <h1 className="header">Durak</h1>
          <p className="subheader">
            – I spent half of it on women, booze and horses. I blew the rest.
          </p>
        </div>
        <div className="button-wrapper">
          <CreateGameButton />
        </div>
      </MainContainer>
    </div>
  );
};

export default MainPage;
