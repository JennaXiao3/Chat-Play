// src/App.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

function App() {
  const [response, setResponse] = useState("");
  const [notification, setNotification] = useState("");


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('response', (data) => {
      setResponse(data.data);
    });

    socket.on('notification', (data) => {
      setNotification(data.data);
    });

    socket.on('connect', () => {
      socket.send("what is good")
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Response: {response}</p>
        <p>Notification: {notification}</p>
      </header>
    </div>
  );
}

export default App;
