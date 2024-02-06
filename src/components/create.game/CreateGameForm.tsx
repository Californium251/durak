"use client";
import { useState } from "react";
import { useFormik, Field, FormikProvider } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { createGame } from "@/slices/gameSlice";
import {
  ToggleButton,
  Form,
  ToggleButtonGroup,
  Button,
  Stack,
  Container,
} from "react-bootstrap";

const CreateGameForm = () => {
  const dispatch = useDispatch();
  const { auth, logout } = useAuth();
  const router = useRouter();
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
  const handleToggleButton = (val: number) => setNumberOfPlayers(val);
  const serverAddress =
    process.env.NEXT_PUBLIC_SOCKET_IO_URL || "http://localhost:3001";
  const formik = useFormik({
    initialValues: {
      bid: 100,
      numberOfPlayers: 2,
      deckSize: 36,
      speed: "slow",
      mode: "throw-in",
      isPrivate: false,
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
            `${serverAddress}/create-game`,
            {
              ...values,
              creator: auth.userId,
              numberOfPlayers,
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
      } catch (e) {
        // @ts-ignore
        if (e instanceof Error && e.request.status === 403) {
          logout();
        }
      }
    },
  });
  return (
    <FormikProvider value={formik}>
      <Form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
        }}
      >
        <Container
          fluid
          className="align-items-center justify-content-center"
          style={{
            border: "1px solid black",
            borderRadius: "5px",
            minWidth: "300px",
            padding: "10px",
          }}
        >
          <Stack direction="vertical" gap={3}>
            <h1>Создать игру</h1>
            <Form.Text>Количество игроков</Form.Text>
            <ToggleButtonGroup
              type="radio"
              name="numberOfPlayers"
              defaultValue={2}
              onChange={handleToggleButton}
            >
              <ToggleButton id="tbg-radio-1" value={2}>
                2
              </ToggleButton>
              <ToggleButton id="tbg-radio-2" value={3}>
                3
              </ToggleButton>
              <ToggleButton id="tbg-radio-3" value={4}>
                4
              </ToggleButton>
            </ToggleButtonGroup>
            <Button type="submit" className="mb-2">
              Создать игру
            </Button>
          </Stack>
        </Container>
      </Form>
    </FormikProvider>
  );
};

export default CreateGameForm;
