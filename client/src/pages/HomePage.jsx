import React from "react";
import BasePage from "./BasePage";
import { Button, Typography } from "@mui/material";
import gameIcon from "../images/gameIcon.svg";
import IconHeading from "./IconHeading";

function HomePage() {
  return (
    <BasePage>
      <IconHeading text="CHAT AND GUESS" icon={gameIcon} />
      <Typography pb={5} align="center" variant="body1" width="20rem">
        We will give you prompts and nicknames. Chat with your peers and
        determine who is behind each nickname!
      </Typography>
      <Button variant="fill">JOIN ROOM</Button>
      <Button variant="outlined">CREATE ROOM</Button>
    </BasePage>
  );
}

export default HomePage;
