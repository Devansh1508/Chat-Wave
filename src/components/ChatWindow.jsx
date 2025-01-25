import React from "react";
import MessageBubble from "./MessageBubble";
import InputArea from "./InputArea";
import Header from "./Header";

const ChatWindow = ({ activeContact, messages, sendMessage, setShowProfile }) => {
  return (
    <div className="w-2/3 flex flex-col">
      <Header
        name={activeContact.name}
        profilePhoto={activeContact.profilePhoto}
        setShowProfile={setShowProfile}
      />
      <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>
      <InputArea sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
