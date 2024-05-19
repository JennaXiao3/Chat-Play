import React, { useEffect, useContext } from "react";
import BasePage from "./BasePage";
import { useParams, Link } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import UserContext from "../contexts/UserContext";
import { socket } from "../websockets";
import IconHeading from "./IconHeading";
import editIcon from "../images/editIcon.svg";

function NamePage() {
  const { type } = useParams(); // will be "join" or "create"
  const [user, setUser] = useContext(UserContext);

  const onContinueHandler = () => {
    if (type === "create") {
      socket.send(
        JSON.stringify({
          action: "create-room",
          hostName: user.name,
        })
      );
    }
  };

  useEffect(() => {
    socket.on("created-room", (data) => {
      data = JSON.parse(data);
      setUser((user) => {
        return {
          ...user,
          nickname: data.user_nickname,
          id: data.user_id,
          roomCode: data.room_code,
          color: "#" + data.user_colour,
        };
      });
    });
  }, []);

  return (
    <BasePage>
      <IconHeading text="YOUR NAME" icon={editIcon} />
      <Box pt={1} pb={12} width="100%" justifyContent="center">
        <Typography pb={2} textAlign="center">
          Enter your name:
        </Typography>
        <Box bgcolor="#1D1B25" width="100%" borderRadius="1rem">
          <TextField
            fullWidth
            value={user.name}
            onChange={(event) => {
              setUser({ ...user, name: event.target.value });
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                  borderRadius: "20rem",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "1.5rem",
                color: "#D2D0DC",
                textAlign: "center",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
              },
            }}
          />
        </Box>
      </Box>
      <Button
        variant="outlined"
        component={Link}
        onClick={onContinueHandler}
        to={type === "join" ? "/join" : "/room/host"}
      >
        CONTINUE
      </Button>
    </BasePage>
  );
}

export default NamePage;
