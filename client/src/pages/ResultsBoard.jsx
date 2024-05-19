import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Profile from "./Profile";
import { v4 as uuidv4 } from "uuid";

function ResultsBoard({ answer }) {
  console.log(answer);
  return (
    <Stack
      bgcolor="#1E1E24"
      height="30rem"
      mt="2rem"
      py="0.5rem"
      borderRadius="1rem"
    >
      {answer.map((player, index) => {
        return (
          <Box key={uuidv4()}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              p="1.5rem 3rem"
            >
              <Profile nickname={player.nickname} color={`#${player.color}`} />
              <Stack
                direction="row"
                spacing={1.5}
                display="flex"
                alignItems="center"
              >
                <Typography fontSize="1rem" variant="body2">
                  was
                </Typography>
                <Typography
                  letterSpacing="1px"
                  fontWeight={600}
                  variant="body2"
                >
                  {player.actualName.toUpperCase()}
                </Typography>
              </Stack>
            </Stack>
            <Box width="100%" display="flex" justifyContent="center">
              <Divider sx={{ borderColor: "#655D87", width: "90%" }} />
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

export default ResultsBoard;
