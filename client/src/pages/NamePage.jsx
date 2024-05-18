import React, { useState } from "react";
import BasePage from "./BasePage";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";

function NamePage() {
  const { type } = useParams();
  const [nickname, setNickname] = useState("[replace with nickname]"); // TODO: get nickname from server
  const [name, setName] = useState("");

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
      <Typography>your nickname is</Typography>
      <Typography>{nickname}</Typography>
      <Button
        variant="outlined"
        component={Link}
        to={type == "join" ? "/join" : "/room/host"}
      >
        CONTINUE
      </Button>
    </BasePage>
  );
}

export default NamePage;
