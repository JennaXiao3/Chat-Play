import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Typography, TextField, Stack } from "@mui/material";
import UserContext from "../contexts/UserContext";
import { socket } from "../websockets";
import Countdown from "react-countdown";
import ChatMessages from "./ChatMessages";
import Profile from "./Profile";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import GuessBox from "./GuessBox";
import PlayersContext from "../contexts/PlayersContext";
import { shuffle } from "../helper";

function GamePage() {
  const [user, setUser] = useContext(UserContext);
  const [prompts, setPrompts] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeEnd, setTimeEnd] = useState(Date.now() + 10000); // TODO: implement time thingy
  const [players, setPlayers] = useContext(PlayersContext);

  const sendMessage = () => {
    // TODO: send user's message to server
    console.log(user);

    socket.send(
      JSON.stringify({
        action: "add-message",
        userId: user.id,
        roomCode: user.roomCode,
        messageText: message,
      })
    );
    setMessage("");
    // console.log(message);
  };

  console.log(timeEnd);

  useEffect(() => {
    // WHY WONT THIS THING WORK :(
    // socket.on("updated-lobby", (data) => {
    //   const allPlayers = JSON.parse(data).users;
    //   setPlayers(allPlayers.filter((player) => player.id !== user.id));
    //   console.log("aint happening:");
    //   console.log(allPlayers);
    // });

    socket.on("new-prompt", (data) => {
      console.log(data);
      setTimeEnd(new Date(data.deletion_time));
      setPrompts(data.prompt_content);
    });

    socket.on("update-chat", (data) => {
      console.log(JSON.parse(data).chat);
      setChatMessages(JSON.parse(data).chat);
    });

    socket.on("ended-game", () => {
      console.log("GAME OVER");
      setIsGameOver(true);
    });
  }, []);
  const timeRenderer = ({ minutes, seconds, completed }) => {
    const textProps = {
      color: "#323868",
      fontWeight: 600,
      opacity: 0.1,
      letterSpacing: "1px",
      fontSize: "1.2rem",
    };
    if (isGameOver) {
      return;
    }
    if (completed) {
      return <Typography {...textProps}>DONE</Typography>;
    } else {
      if (minutes === 0) {
        if (seconds < 10) {
          return (
            <Typography {...textProps} sx={{ color: "#B70E0E" }}>
              {seconds}
            </Typography>
          );
        }
        return <Typography {...textProps}>0:{seconds}</Typography>;
      } else {
        if (seconds < 10) {
          return (
            <Typography {...textProps}>
              {minutes}:0{seconds}
            </Typography>
          );
        }
        return (
          <Typography {...textProps}>
            {minutes}:{seconds}
          </Typography>
        );
      }
    }
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
        item
        xs={4}
        justifyContent="center"
        alignItems="space-between"
        height="100%"
        sx={{
          backgroundImage: "linear-gradient(to bottom, #654597, #4D67CF)",
        }}
      >
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h1"
            sx={{ color: "#FFFFFF", opacity: 0.7 }}
            mb={3}
          >
            Who's Who?
          </Typography>
          <Typography
            fontWeight={400}
            sx={{ color: "#FFFFFF", opacity: 0.7 }}
            mx={12}
            textAlign="center"
            mb={6}
          >
            Drag and drop the names on the right side to create the correct
            name-to-nickname associations
          </Typography>
          <GuessBox isGameOver={isGameOver} />
        </Grid>
        <Grid
          xs={4}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            opacity: 0.7,
            alignItems: "center",
            padding: "1rem 1.2rem",
            backgroundImage: "linear-gradient(to right, #000000, #441B6E)",
          }}
          container
          item
          justifyContent="space-between"
        >
          <Grid item>
            <Profile nickname={user.nickname} color={user.color} />
          </Grid>
          <Grid item>
            <Typography letterSpacing="1px" variant="subtitle1" color="#8E91E3">
              {user.name.toUpperCase()}
            </Typography>
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
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Box p="1rem 1.5rem" pb={0} flexShrink={1} width="100%">
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="0.6rem"
            p="1.2rem 2rem"
            sx={{
              backgroundImage: "linear-gradient(to right, #C6A8FC, #8C99FF)",
              boxShadow: 3,
            }}
          >
            <Typography
              color="#262332"
              pr="2rem"
              fontSize="1.2rem"
              fontWeight={600}
            >
              {isGameOver ? "Submit your guesses now!" : prompts}
            </Typography>
            <Box>
              <Countdown date={timeEnd} renderer={timeRenderer} />
            </Box>
          </Box>
        </Box>
        <Box height="100%" width="100%">
          <Box flexGrow={1} display="flex">
            <ChatMessages prompts={prompts} chat={chatMessages} />
          </Box>
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
          <Stack direction="row" width="100%" spacing={2}>
            <Grid item width="100%">
              <Box bgcolor="#363147" width="100%" borderRadius="1rem" mr={2}>
                <TextField
                  autoFocus
                  placeholder="Write a message..."
                  fullWidth
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                        borderRadius: "20rem",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: ".9rem",
                      color: "#D2D0DC",
                      fontWeight: 200,
                      p: "1rem 1.4rem",
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item flexShrink={1}>
              <Button
                sx={{ fontSize: "1rem", p: ".8rem 1.4rem" }}
                variant="fill"
                onClick={sendMessage}
              >
                <Stack direction="row" display="flex" alignItems="center">
                  <SendRoundedIcon sx={{ mr: 1 }} />
                  Send
                </Stack>
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GamePage;
