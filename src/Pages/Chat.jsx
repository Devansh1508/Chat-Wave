import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Backend server URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for 'chat message' events and update the messages state
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    
    return () => {
      socket.off('chat message'); // Clean up when component unmounts
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("working");
    if (message.trim()) {
      socket.emit('chat message', message); // Emit message to the server
      setMessage(''); // Clear input field after sending
    }
  };

  return (
    <div>
      {/* dummy page for checking the socket  */}
      <h2>React Chat App</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
        {messages}
      </form>
    </div>
  );
};

export default Chat;
