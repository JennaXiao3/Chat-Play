// src/App.js
import { useEffect } from "react";
import { socket } from "./websockets";

function App() {

  useEffect(() => {
    socket.on("created-room", data => {
      console.log(data)
    })
  }, [])

  const createRoom = () => {
    socket.send(
      JSON.stringify({
        "action": "create-room",
        "hostName": "bob",
      })
    );
  };

  return <button onClick={createRoom}>Create Room</button>;
}

export default App;
