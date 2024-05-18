import React, { useEffect, useState } from "react";
import BasePage from "./BasePage";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";
import { socket } from "../websockets";

function NamePage() {
  const { type } = useParams(); // will be "join" or "create"
  const [name, setName] = useState("");

  const onContinueHandler = () => {
    if (type === "create") {
      socket.send(JSON.stringify({
        action: "create-room",
        hostName: name
      }))

      
    }
    
  }

  useEffect(() => {
    socket.on("created-room", data => console.log(data))
  })

  return (
    <BasePage>
      <Typography>Enter your name</Typography>
      <TextField
        sx={{ bgcolor: "white" }}
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <Button
        variant="outlined"
        component={Link}
        onClick = {onContinueHandler}
        to={type === "join" ? "/join" : "/room/host"}
      >
        CONTINUE
      </Button>
    </BasePage>
  );
}

export default NamePage;
