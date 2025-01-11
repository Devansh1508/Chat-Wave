import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css"; // Include the styles in this file

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:4000"); // Backend server URL

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit("chat message", input);
    setInput("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;