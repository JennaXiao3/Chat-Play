import React from "react";

const ChatMessages = ({ messages }) => {
console.log(messages)
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          {message.text} {message.timestamp}
        </li>
      ))}
    </ul>
  );
};

export default ChatMessages;
