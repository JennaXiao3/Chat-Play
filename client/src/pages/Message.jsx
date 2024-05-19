import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as ProfileIcon } from "../images/profileIcon.svg";

function Message({ message, nickname, color }) {
  // console.log("props: ");
  // console.log(props);
  console.log(color);
  //console.log("message: " + message + " | nickname: " + nickname);
  return (
    <Stack direction="row" pb="1.4rem">
      <ProfileIcon width="2.5rem" height="2.5rem" fill={color} />
      <Box pl={2}>
        <Typography variant="subtitle1" color={color}>
          {nickname}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </Box>
    </Stack>
  );
}

export default Message;
