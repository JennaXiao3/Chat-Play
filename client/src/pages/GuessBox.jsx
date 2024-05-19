import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import PlayersContext from "../contexts/PlayersContext";
import Profile from "./Profile";
import UserContext from "../contexts/UserContext";
import { shuffle } from "../helper";
import GuessesContext from "../contexts/GuessesContext";
import { socket } from "../websockets";

const initialItems = [
  { id: "item-1", content: "Card 1 asdfasdfasdfasd" },
  { id: "item-2", content: "Card 2" },
  { id: "item-3", content: "Card 3" },
];

function GuessBox({ isGameOver }) {
  const [items, setItems] = useState([]);
  const [players, setPlayers] = useContext(PlayersContext);
  const [user, setUser] = useContext(UserContext);
  const [guesses, setGuesses] = useContext(GuessesContext);

  console.log(players);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const submitGuesses = () => {
    console.log(players);
    console.log(items);
    const userGuesses = [];

    for (let i = 0; i < players.length; i++) {
      userGuesses.push([players[i].nickname, items[i].name]);
    }

    socket.send(
      JSON.stringify({
        action: "add-guess",
        userId: user.id,
        userGuesses: userGuesses,
        roomCode: user.roomCode,
      })
    );
    console.log(userGuesses);
  };

  useEffect(() => {
    console.log("is this even happening");
    setPlayers((prevPlayers) => {
      let filtered = prevPlayers.filter((player) => player.id !== user.id);
      return shuffle(filtered);
    });
    setItems(() => {
      let filtered = players.filter((item) => item.id !== user.id);
      return shuffle(filtered);
    });
  }, []);

  return (
    <Stack direction="column" spacing={10}>
      <Stack direction="row" spacing={2}>
        <Stack direction="column">
          {players.map((player) => (
            <Box width={200}>
              <Card
                elevation={8}
                sx={{
                  marginBottom: 4,
                  borderRadius: ".8rem",
                  py: "0.8rem",
                  backgroundColor: "#2C2B31",
                  px: "1.2rem",
                }}
              >
                <Profile
                  nickname={player.nickname}
                  color={`#${player.colour}`}
                />
              </Card>
            </Box>
          ))}
        </Stack>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={(el) => {
                  provided.innerRef(el);
                }}
                sx={{
                  width: 200,
                }}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        elevation={8}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          marginBottom: 4,
                          borderRadius: ".8rem",
                          opacity: 0.7,
                          textAlign: "center",
                          py: "1rem",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Box width={160}>
                          <Typography noWrap fontWeight={600} color="#2C2B31">
                            {item.name.toUpperCase()}
                          </Typography>
                        </Box>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>
      {isGameOver ? (
        <Button variant="fill" onClick={submitGuesses}>
          SUBMIT GUESSES
        </Button>
      ) : null}
    </Stack>
  );
}

export default GuessBox;
