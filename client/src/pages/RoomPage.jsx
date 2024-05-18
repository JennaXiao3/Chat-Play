import React, { useState, useContext, useEffect } from "react";
import BasePage from "./BasePage";
import { Typography, Button } from "@mui/material";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { socket } from "../websockets";

function RoomPage() {
  const [roomCode, setRoomCode] = useState("654876"); // TODO: set actual room code
  const [playersJoined, setPlayersJoined] = useState([
    "Brandon",
    "Darren",
    "Grant",
    "Jenna",
  ]); // TODO: get players who joined
  const { playerType } = useParams(); // will be "player" or "host"
  const [user, setUser] = useContext(UserContext); // TODO: add nickname to user


  useEffect(() => {
    socket.on("updated-lobby", data => {
      setPlayersJoined(JSON.parse(data).users.map(user => user.nickname))
    })
  })

  return (
    <BasePage>
      <Typography>Your room code is</Typography>
      <Typography variant="h1">{roomCode}</Typography>
      {playersJoined.map((player, index) => (
        <Typography key={index}>{player}</Typography>
      ))}
      <Typography>your nickname is {user.nickname}</Typography>
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
