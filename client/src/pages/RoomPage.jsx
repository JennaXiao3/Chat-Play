import React, { useState, useContext, useEffect } from "react";
import BasePage from "./BasePage";
import { Typography, Button } from "@mui/material";
import { useParams } from "react-router";
import { Link, useNavigate  } from "react-router-dom";
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
  const navigate = useNavigate ()


  useEffect(() => {
    socket.on("updated-lobby", data => {
      setPlayersJoined(JSON.parse(data).users.map(user => user.nickname))
    })
    console.log(user)
  })

  const startGameHandler = () => {
    socket.send(JSON.stringify({
      action: "start-room",
      userId: user.id,
      roomCode: user.roomCode
    }))
  }

  useEffect(() => {
    socket.on("started-game", () => {
      navigate("/game")
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
        <Button variant="fill" component={Link} to="/game" onClick={startGameHandler}>
          Start Game
        </Button>
      ) : (
        <Typography>Waiting for the host to start the game...</Typography>
      )}
    </BasePage>
  );
}

export default RoomPage;
