import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasePage from "./BasePage";
import { Link } from "react-router-dom";
import { socket } from "../websockets";

function JoinPage() {
  const [roomCode, setRoomCode] = useState("");

  const joinRoomHandler = () => {
    socket.send(JSON.stringify({
      action: "join-room",
      userName: "bob",
      roomCode: parseInt(roomCode)
    }))
  };

  useEffect(() => {
    socket.on("joined-room", data => console.log(data))
  })
  return (
    <BasePage>
      <Typography variant="h1">JOIN A ROOM</Typography>
      <Typography>Enter the room code:</Typography>

      <TextField
        sx={{ backgroundColor: "white" }}
        value={roomCode}
        onChange={(event) => {
          setRoomCode(event.target.value);
        }}
      />
      <Button
        onClick={joinRoomHandler}
        variant="outlined"
        component={Link}
        to="/room/player"
      >
        JOIN ROOM
      </Button>
    </BasePage>
  );
}

export default JoinPage;
