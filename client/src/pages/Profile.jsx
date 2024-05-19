import { Stack, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as ProfileIcon } from "../images/profileIcon.svg";

function Profile({ nickname, color }) {
  return (
    <Stack direction="row">
      <ProfileIcon fill={color} />
      <Typography pl={1.5} variant="subtitle1" color={color}>
        {nickname}
      </Typography>
    </Stack>
  );
}

export default Profile;
