// src/App.js
import { useEffect } from "react";
import { socket } from "./websockets";

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

  const joinRoom = () => {
    socket.send(JSON.stringify({
      action: "join-room",
      roomCode: "safdfa",
      userName: "alice"
    }))
  }

  return (
    <>
      <button onClick={createRoom}>Create Room</button>
      <button onClick = {joinRoom}>Join Room</button>
    </>
  );
}

export default App;
