import { useEffect, useState } from "react";
import { socket } from "./websockets";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import NamePage from "./pages/NamePage";
import JoinPage from "./pages/JoinPage";
import RoomPage from "./pages/RoomPage";
import GamePage from "./pages/GamePage";
import UserContext from "./contexts/UserContext";
import LeaderboardPage from "./pages/LeaderboardPage";
import PlayersContext from "./contexts/PlayersContext";
import GuessesContext from "./contexts/GuessesContext";

function App() {
  useEffect(() => {
    socket.on("created-room", (data) => {
      console.log(data);
    });
  }, []);

  const [user, setUser] = useState({
    name: "",
    nickname: "",
    id: null,
    roomCode: null,
    color: "",
  });

  const [guesses, setGuesses] = useState([]);

  const [players, setPlayers] = useState([]);

  // [
  //   {
  //     colour: "048BA8",
  //     id: 3239,
  //     name: "razi",
  //     nickname: "happybrandon89",
  //     score: -1,
  //   },
  //   {
  //     colour: "99C24D",
  //     id: 2732,
  //     name: "jenna",
  //     nickname: "honksquirrel69",
  //   },
  //   {
  //     colour: "42F2F7",
  //     id: 8381,
  //     name: "clover",
  //     nickname: "gooseapple71",
  //     score: -1,
  //   },
  // ]

  return (
    <ThemeProvider theme={theme}>
      <GuessesContext.Provider value={[guesses, setGuesses]}>
        <UserContext.Provider value={[user, setUser]}>
          <PlayersContext.Provider value={[players, setPlayers]}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/name/:type" element={<NamePage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/room/:playerType" element={<RoomPage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
              </Routes>
            </BrowserRouter>
          </PlayersContext.Provider>
        </UserContext.Provider>
      </GuessesContext.Provider>
    </ThemeProvider>
  );
}

export default App;
