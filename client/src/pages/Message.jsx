import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function Message(props) {
  console.log("props: ");
  console.log(props);
  //console.log("message: " + message + " | nickname: " + nickname);
  return (
    <Stack>
      <Typography>{/* {nickname} says {message} */}</Typography>
    </Stack>
  );
}

export default Message;
