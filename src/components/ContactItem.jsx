import React from "react";

const ContactItem = ({ contact, isActive, onClick, onProfileClick }) => {
  return (
    <div
      className={`p-4 border-b cursor-pointer hover:bg-gray-200 flex items-center ${
        isActive ? "bg-gray-300" : ""
      }`}
    >
      <img
        src={contact.profilePhoto || "/placeholder.svg"}
        alt={contact.name}
        className="w-12 h-12 rounded-full mr-4 cursor-pointer"
        onClick={() => onProfileClick(contact)}
      />
      <div onClick={() => onClick(contact)}>
        <h3 className="font-semibold">{contact.name}</h3>
        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
      </div>
    </div>
  );
};

export default ContactItem;
