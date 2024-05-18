import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";

function LeaderboardPage() {
  const [user, setUser] = useContext(UserContext);

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
            justifyContent="center"
            alignItems="center"
            borderRadius="0.6rem"
            sx={{
              backgroundImage: "linear-gradient(to right, #C6A8FC, #8C99FF)",
            }}
            p="1.5rem 2rem"
          >
            <Typography color="#262332">LEADERBOARD</Typography>
          </Box>
        </Box>
        <Box width="100%" height="100%" p="1.5rem 2rem">
          <Typography>stuff here</Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default LeaderboardPage;
