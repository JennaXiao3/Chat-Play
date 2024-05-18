import React from "react";
import { Box, Stack } from "@mui/material";

function BasePage({ children }) {
  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to bottom right, #654597, #4D67CF)",
        width: "100%",
        height: "100%",
        position: "fixed",
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        width="30rem"
        borderRadius="2rem"
        pt="3rem"
        pb="4rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: "linear-gradient(to bottom right, #2C2C30, #221E32)",
        }}
      >
        <Stack
          spacing={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
}

export default BasePage;
