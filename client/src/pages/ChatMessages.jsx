import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Message from "./Message";

const ChatMessages = ({ chat }) => {
  chat.map((prompt) => {
    console.log(prompt);
  });
  return (
    <Box width="100%" height="100%" p="1.5rem 2rem">
      {chat.map((prompt, index) => {
        <>
          <Divider key={index} />
          <Typography>{prompt.prompt}</Typography>
          {prompt.messages.map((msg, index) => {
            console.log("my message: " + msg.message.text);
            return (
              <Message
                key={index}
                message={msg}
                // message={msg.message.text}
                // nickname={msg.user.nickname}
                // color={msg.user.colour}
              />
            );
          })}
        </>;
      })}
      <Message />
    </Box>
  );
};

export default ChatMessages;
