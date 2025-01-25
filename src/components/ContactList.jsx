import React from "react";
import ContactItem from "./ContactItem";

const ContactList = ({ contacts, activeContact, setActiveContact, setShowProfile }) => {
  return (
    <div className="w-1/3 bg-gray-100 overflow-y-auto">
      <div className="p-4 bg-gray-200">
        <h2 className="text-xl font-bold">Chats</h2>
      </div>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          isActive={activeContact.id === contact.id}
          onClick={setActiveContact}
          onProfileClick={setShowProfile}
        />
      ))}
    </div>
  );
};

export default ContactList;
