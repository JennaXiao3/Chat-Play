// src/App.js
import { socket } from "./websockets";

function App() {
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
