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

function App() {
  useEffect(() => {
    socket.on("created-room", (data) => {
      console.log(data);
    });
  }, []);

  const createRoom = () => {
    socket.send(
      JSON.stringify({
        action: "create-room",
        hostName: "bob",
      })
    );
  };

  const [user, setUser] = useState({ name: "", nickname: "", id: null, roomCode: null });

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/name/:type" element={<NamePage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/room/:playerType" element={<RoomPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
