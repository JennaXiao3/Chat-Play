import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BasePage from "./BasePage";
import { Link } from "react-router-dom";
import { socket } from "../websockets";
import UserContext from "../contexts/UserContext";
import IconHeading from "./IconHeading";
import joinIcon from "../images/joinIcon.svg";
import PinInput from "react-pin-input";
let exists = false
function JoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [user, setUser] = useContext(UserContext);

  const joinRoomHandler = () => {
    console.log("bsadfas");
    console.log(roomCode);
    socket.send(
      JSON.stringify({
        action: "join-room",
        userName: user.name,
        roomCode: parseInt(roomCode),
      })
    );
  };

  useEffect(() => {
    socket.on("joined-room", (data) => {
      data = JSON.parse(data);
      console.log(user)

      if (exists) return;

      setUser((user) => {
        return {
          ...user,
          nickname: data.user_nickname,
          id: data.user_id,
          roomCode: data.room_code,
          color: "#" + data.user_colour,
        };
      });

      exists = true
    });
  }, []);

  return (
    <BasePage>
      <IconHeading text="JOIN A ROOM" icon={joinIcon} />
      <Typography>Enter the room code:</Typography>
      <PinInput
        length={4}
        initialValue=""
        onChange={(value, index) => {
          setRoomCode(value);
        }}
        type="numeric"
        inputMode="number"
        style={{ marginBottom: "5rem" }}
        inputStyle={{
          backgroundColor: "#1D1B25",
          border: "none",
          borderRadius: "1rem",
          fontSize: "2.5rem",
          padding: "0.8rem",
          color: "#B2B0BA",
          fontWeight: 600,
        }}
        inputFocusStyle={{}}
        onComplete={(value, index) => {}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <Button
        onClick={joinRoomHandler}
        variant="outlined"
        component={Link}
        to="/room/player"
      >
        JOIN ROOM
      </Button>
    </BasePage>
  );
}

export default JoinPage;
