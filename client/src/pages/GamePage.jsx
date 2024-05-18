import React, { useContext, useState } from "react";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import UserContext from "../contexts/UserContext";

function GamePage() {
  const [user, setUser] = useContext(UserContext);
  const [prompt, setPrompt] = useState("What is your favourite animal?");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState("0:59"); // TODO: implement time thingy

  const sendMessage = () => {
    // TODO: send user's message to server
    console.log(message);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "space-between",
      }}
    >
      <Grid
        container
        xs={4}
        justifyContent="center"
        alignItems="space-between"
        height="100%"
        sx={{
          backgroundImage: "linear-gradient(to bottom, #654597, #4D67CF)",
        }}
      >
        <Grid container item justifyContent="center" alignItems="center">
          <Typography>Who's Who?</Typography>
        </Grid>
        <Grid
          xs={4}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            opacity: 0.5,
            alignItems: "center",
            padding: "1rem 2rem",
            backgroundImage: "linear-gradient(to right, #000000, #441B6E)",
          }}
          container
          item
          justifyContent="space-between"
        >
          <Grid item>
            <Typography>{user.nickname}</Typography>
          </Grid>
          <Grid item>
            <Typography>{user.name}</Typography>
          </Grid>
        </Grid>
        <Grid></Grid>
      </Grid>
      <Grid
        container
        xs={8}
        item
        sx={{
          backgroundImage: "linear-gradient(to bottom right, #2C2C30, #221E32)",
        }}
        alignItems="start"
        justifyContent="start"
      >
        <Box p="1rem 1.5rem" flexShrink={1} width="100%">
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="0.6rem"
            sx={{
              backgroundImage: "linear-gradient(to right, #C6A8FC, #8C99FF)",
            }}
            p="1.5rem 2rem"
          >
            <Typography color="#262332">{prompt}</Typography>
            <Box>{timeLeft}</Box>
          </Box>
        </Box>
        <Box width="100%" height="100%" p="1.5rem 2rem">
          <Typography>chat goes here</Typography>
        </Box>
        <Grid
          xs={8}
          container
          item
          mb="1.5rem"
          px="1rem"
          sx={{
            position: "fixed",
            bottom: 0,
            alignItems: "center",
          }}
        >
          <Grid item container xs={10}>
            <TextField
              fullWidth
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              sx={{ bgcolor: "white" }}
            />
          </Grid>
          <Grid item container xs={2}>
            <Button variant="fill" onClick={sendMessage}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GamePage;
