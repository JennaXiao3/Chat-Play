import React from "react";
import { Box, Typography } from "@mui/material";

function IconHeading({ text, icon }) {
  return (
    <>
      <Box
        component="img"
        src={icon}
        alt="Game Icon"
        sx={{ width: 90, height: 90 }}
        pb={1}
      />
      <Typography variant="h1">{text}</Typography>
    </>
  );
}

export default IconHeading;
