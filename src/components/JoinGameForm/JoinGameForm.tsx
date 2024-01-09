"use client";
import React from "react";
import { useFormik } from "formik";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createGame } from "@/slices/gameSlice";
import { Form, Button } from "react-bootstrap";
import MainContainer from "../main.page/Container";
import Container from "react-bootstrap/Container";

const JoinGameForm = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const serverAddress =
    process.env.NEXT_PUBLIC_SOCKET_IO_URL || "http://localhost:3001";
  const formik = useFormik({
    initialValues: {
      gameId: "",
      name: "",
    },
    onSubmit: async (values) => {
      const res = await axios.post(
        `${serverAddress}/join-game`,
        {
          ...values,
          name: auth.name,
          userId: auth.userId,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      dispatch(createGame(res.data));
      router.push(`/game/${res.data._id}`);
    },
  });
  return (
    <MainContainer>
      {auth.token && (
        <Form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "200px",
          }}
        >
          <Container className="d-flex flex-row align-items-center justify-content-center mb-3">
            <label htmlFor="gameId" style={{ flexShrink: 0 }}>
              Game ID:{" "}
            </label>
            <input
              id="gameId"
              name="gameId"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.gameId}
              style={{ marginLeft: "5px" }}
            />
          </Container>
          <Button type="submit">Join</Button>
        </Form>
      )}
    </MainContainer>
  );
};

export default JoinGameForm;
