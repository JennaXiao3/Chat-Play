import { useEffect } from "react";
import { socket } from "./websockets";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import NamePage from "./pages/NamePage";
import JoinPage from "./pages/JoinPage";
import RoomPage from "./pages/RoomPage";
import GamePage from "./pages/GamePage";

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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/name/:type" element={<NamePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/room/:playerType" element={<RoomPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
