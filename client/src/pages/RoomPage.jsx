import React, { useState, useContext, useEffect } from "react";
import BasePage from "./BasePage";
import { Typography, Box, Button, Stack } from "@mui/material";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { socket } from "../websockets";
import Profile from "./Profile";
import PlayersContext from "../contexts/PlayersContext";
import { shuffle } from "../helper";

function RoomPage() {
  const { playerType } = useParams(); // will be "player" or "host"
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const [players, setPlayers] = useContext(PlayersContext);

  useEffect(() => {
    socket.on("updated-lobby", (data) => {
      const allPlayers = JSON.parse(data).users;
      setPlayers(allPlayers);
      // setPlayers(shuffle(players.filter((player) => player.id !== user.id)));
    });
    console.log(user);
  });

  console.log(user);

  const startGameHandler = () => {
    socket.send(
      JSON.stringify({
        action: "start-room",
        userId: user.id,
        roomCode: user.roomCode,
      })
    );
    // const allPlayers = JSON.parse(data).users;
    // setPlayers(shuffle(players.filter((player) => player.id !== user.id)));
    // console.log("BRUH PLAYERS");
    // console.log(players.filter((player) => player.id !== user.id));
    // setPlayers(shuffle(players));
  };

  useEffect(() => {
    socket.on("started-game", () => {
      navigate("/game");
    });
  });

  return (
    <BasePage>
      <Typography pb="-39px">Your room code is</Typography>
      <Typography variant="h1" letterSpacing="1rem" fontSize="4rem">
        {user.roomCode}
      </Typography>
      <Stack
        width="100%"
        display="flex"
        justifyContent="start"
        alignItems="center"
        borderRadius="1rem"
        py="1.5rem"
        bgcolor="#1D1B25"
        height="15rem"
        overflow="auto"
        sx={{
          bgcolor: "#1D1B25",
        }}
      >
        {players.map((player, index) => (
          <Typography
            fontWeight={400}
            letterSpacing="2px"
            textTransform="uppercase"
            p="0.5rem"
            textAlign="center"
            color="#BFA9FF"
            key={index}
          >
            {player.name}
          </Typography>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Your nickname:</Typography>
        <Box
          display="flex"
          alignItems="center"
          bgcolor="#2E2B3B"
          p="0.6rem 1rem"
          borderRadius="0.8rem"
        >
          <Profile nickname={user.nickname} color={user.color} />
        </Box>
      </Stack>
      {playerType === "host" ? (
        <Button
          variant="fill"
          component={Link}
          to="/game"
          onClick={startGameHandler}
        >
          Start Game
        </Button>
      ) : (
        <Typography color="#473F69">
          Waiting for the host to start the game...
        </Typography>
      )}
    </BasePage>
  );
}

export default RoomPage;
