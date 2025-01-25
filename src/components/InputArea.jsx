import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const InputArea = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        type: "file",
        file: URL.createObjectURL(file),
      };
      sendMessage(newMessage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage({ type: "text", text: message });
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-100 p-4 flex flex-col">
      {showEmojiPicker && (
        <div className="absolute bottom-16">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center">
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="mr-2"
        >
          😊
        </button>
        <label className="mr-2 cursor-pointer">
          📎
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 rounded-full py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
        <button
          type="submit"
          className="bg-blue-800 text-white rounded-full px-6 py-2 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default InputArea;
