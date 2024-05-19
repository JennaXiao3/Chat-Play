import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Message from "./Message";
import { v4 as uuidv4 } from 'uuid';

const ChatMessages = ({ chat }) => {
  chat.map((prompt) => {
    console.log(prompt);
  });
  return (
    <Box width="100%" height="100%" p="1.5rem 2rem">
      {chat.map((prompt, index) => {
        return (<>
          <Divider key={uuidv4()} />
          <Typography>{prompt.prompt}</Typography>
          {prompt.messages.map((msg, index) => {
            console.log("my message: " + msg.message.text);
            return (
              <Message
                key = {uuidv4()}
                message={msg}
                // message={msg.message.text}
                // nickname={msg.user.nickname}
                // color={msg.user.colour}
              />
            );
          })}
        </>);
      })}
    </Box>
  );
};

export default ChatMessages;
