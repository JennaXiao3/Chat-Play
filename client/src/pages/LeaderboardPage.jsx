import React, { useContext, useState, useEffect } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";
import { socket } from "../websockets";
import GuessesContext from "../contexts/GuessesContext";
import PlayersContext from "../contexts/PlayersContext";
import Profile from "./Profile";
import { getAnswer } from "../helper";
import ResultsBoard from "./ResultsBoard";

function LeaderboardPage() {
  const [user, setUser] = useContext(UserContext);
  const [scores, setScores] = useState();
  const [guesses] = useContext(GuessesContext);
  const [players, setPlayers] = useContext(PlayersContext);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    socket.on("scores", (res) => {
      setScores(res.scores);
    });
  });

  console.log("my scores");
  console.log(guesses);

  console.log("all scores:");
  console.log(scores);

  console.log(players);

  useEffect(() => {
    setAnswer(getAnswer(players, guesses));
    console.log(getAnswer(players, guesses));
  }, []);

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
          flexDirection="column"
          item
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h1"
            sx={{ color: "#FFFFFF", opacity: 0.7 }}
            mb={8}
          >
            YOUR GUESSES
          </Typography>

          <Stack direction="column">
            <Stack direction="row" spacing={2}>
              <Stack direction="column">
                {answer.map((player) => (
                  <Box width={200}>
                    <Card
                      elevation={8}
                      sx={{
                        marginBottom: 4,
                        borderRadius: ".8rem",
                        py: "0.8rem",
                        backgroundColor: "#2C2B31",
                        px: "1.2rem",
                      }}
                    >
                      <Profile
                        nickname={player.nickname}
                        color={`#${player.color}`}
                      />
                    </Card>
                  </Box>
                ))}
              </Stack>
              <Stack direction="column">
                {answer.map((player) => (
                  <Box width={200}>
                    <Card
                      elevation={8}
                      sx={{
                        marginBottom: 4,
                        borderRadius: ".8rem",
                        opacity: 0.7,
                        textAlign: "center",
                        py: "1rem",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: player.isCorrect
                          ? "#52D078"
                          : "#FF8787",
                      }}
                    >
                      <Box width={160}>
                        <Typography noWrap fontWeight={600} color="#2C2B31">
                          {player.guessedName.toUpperCase()}
                        </Typography>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          xs={4}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            opacity: 0.5,
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
        alignItems="start"
        justifyContent="start"
      >
        <Box p="1rem 1.5rem" flexShrink={1} width="100%">
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="0.6rem"
            sx={{
              backgroundImage: "linear-gradient(to right, #C6A8FC, #8C99FF)",
            }}
            p="1.5rem 2rem"
          >
            <Typography
              fontSize="2rem"
              color="#262332"
              letterSpacing="2px"
              fontWeight={600}
            >
              THE REVEAL
            </Typography>
          </Box>
        </Box>
        <Box width="100%" height="100%" p="1.5rem 2rem">
          <ResultsBoard answer={answer} />
        </Box>
      </Grid>
    </Box>
  );
}

export default LeaderboardPage;
