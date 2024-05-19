import React, { useRef, useEffect } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";

const ChatMessages = ({ prompts, chat }) => {
  const scrollRef = useRef(null);
  console.log(chat);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [chat]);
  return (
    <Box width="100%" pr=".5rem">
      <Box
        py="1rem"
        px="2rem"
        height="70vh"
        marginBottom="30rem"
        overflow="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: ".4rem",
            background: "#1A1922",
            borderRadius: "1rem",
          },
          "&::-webkit-scrollbar-track": {
            background: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#33304A",
            borderRadius: "1rem",
          },
        }}
      >
        {chat.map((prompt) => {
          return (
            <>
              <Stack direction="row" display="flex" alignItems="center">
                <Box width="100%">
                  <Divider
                    sx={{ borderColor: "#655D87", width: "100%" }}
                    key={uuidv4()}
                  />
                </Box>
                <Box sx={{ flexShrink: 1 }}>
                  <Typography
                    textAlign="right"
                    noWrap
                    variant="body2"
                    color="#655D87"
                    px={2}
                    maxWidth="30rem"
                  >
                    {prompt.prompt}
                  </Typography>
                </Box>
                <Box width="100%">
                  <Divider
                    sx={{ borderColor: "#655D87", my: "1.4rem", width: "100%" }}
                    key={uuidv4()}
                  />
                </Box>
              </Stack>
              {prompt.messages.map((msg) => {
                return (
                  <Box ref={scrollRef}>
                    <Message
                      key={uuidv4()}
                      message={msg.message.text}
                      nickname={msg.user.nickname}
                      color={`#${msg.user.colour}`}
                    />
                  </Box>
                );
              })}
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default ChatMessages;
