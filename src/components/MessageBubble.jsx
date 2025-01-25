import React from "react";

const MessageBubble = ({ message }) => {
  const isSentByMe = message.sender === "me";

  return (
    <div
      className={`flex ${isSentByMe ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`rounded-lg p-3 ${
          isSentByMe ? "bg-blue-800 text-white" : "bg-gray-300 text-black"
        }`}
        style={{ maxWidth: "70%" }}
      >
        {message.type === "file" ? (
          <img
            src={message.file}
            alt="sent-file"
            className="rounded-lg max-w-full"
          />
        ) : (
          <p>{message.text}</p>
        )}
        <span className="text-xs text-gray-500 block mt-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
