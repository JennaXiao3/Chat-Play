import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

function GamePage() {
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
      }}
    >
      <Box
        width="40rem"
        display="flex"
        justifyContent="center"
        alignItems="space-between"
        sx={{
          backgroundImage: "linear-gradient(to bottom, #654597, #4D67CF)",
        }}
      >
        <Box>
          <Typography>Who's Who?</Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box
        display="flex"
        width="100%"
        sx={{
          backgroundImage: "linear-gradient(to bottom right, #2C2C30, #221E32)",
        }}
      >
        bye
      </Box>
    </Box>
  );
}

export default GamePage;
