import React, { useState } from "react";
import BasePage from "./BasePage";
import { Typography, Button } from "@mui/material";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function RoomPage() {
  const [roomCode, setRoomCode] = useState("654876"); // TODO: set actual room code
  const [playersJoined, setPlayersJoined] = useState([
    "Brandon",
    "Darren",
    "Grant",
    "Jenna",
  ]); // TODO: get players who joined
  const { playerType } = useParams(); // will be "player" or "host"
  const [nickname, setNickname] = useState("[replace with nickname]"); // TODO: get nickname from server

  return (
    <BasePage>
      <Typography>Your room code is</Typography>
      <Typography variant="h1">{roomCode}</Typography>
      {playersJoined.map((player) => (
        <Typography>{player}</Typography>
      ))}
      <Typography>your nickname is {nickname}</Typography>
      {playerType === "host" ? (
        <Button variant="fill" component={Link} to="/game">
          Start Game
        </Button>
      ) : (
        <Typography>Waiting for the host to start the game...</Typography>
      )}
    </BasePage>
  );
}

export default RoomPage;
