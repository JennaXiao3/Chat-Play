import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import BasePage from "./BasePage";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function JoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [user] = useContext(UserContext);
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
      <Button variant="outlined" component={Link} to="/room/player">
        JOIN ROOM
      </Button>
    </BasePage>
  );
}

export default JoinPage;
