import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BasePage from "./BasePage";
import { Link } from "react-router-dom";
import { socket } from "../websockets";
import UserContext from "../contexts/UserContext";

function JoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [user] = useContext(UserContext);

  const joinRoomHandler = () => {
    socket.send(JSON.stringify({
      action: "join-room",
      userName: user.name,
      roomCode: parseInt(roomCode)
    }))
  };

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
