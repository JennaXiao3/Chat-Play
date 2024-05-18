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
  const [isHost, setIsHost] = useState(true);
  const { playerType } = useParams();

  return (
    <BasePage>
      <Typography>Your room code is</Typography>
      <Typography variant="h1">{roomCode}</Typography>
      {playersJoined.map((player) => (
        <Typography>{player}</Typography>
      ))}
      {playerType == "host" ? (
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
