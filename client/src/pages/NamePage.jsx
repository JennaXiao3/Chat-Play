import React, { useState } from "react";
import BasePage from "./BasePage";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";

function NamePage() {
  const { type } = useParams(); // will be "join" or "create"
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
      <Button
        variant="outlined"
        component={Link}
        to={type === "join" ? "/join" : "/room/host"}
      >
        CONTINUE
      </Button>
    </BasePage>
  );
}

export default NamePage;
