import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import ProfileModal from "./components/ProfileModal";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showProfile, setShowProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();
      setContacts(data.contacts);
      setActiveContact(data.contacts[0]);
      setMessages(data.contacts[0].messages);
    };
    fetchData();
  }, []);

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { ...message, sender: "me" }]);
  };

  const handleContactChange = (contact) => {
    setActiveContact(contact);
    setMessages(contact.messages);
  };

  if (!activeContact) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <ContactList
        contacts={contacts}
        activeContact={activeContact}
        setActiveContact={handleContactChange}
        setShowProfile={setShowProfile}
      />
      <ChatWindow
        activeContact={activeContact}
        messages={messages}
        sendMessage={sendMessage}
        setShowProfile={() => setShowProfile(activeContact)}
      />
      {showProfile && <ProfileModal contact={showProfile} onClose={() => setShowProfile(null)} />}
    </div>
  );
};

export default App;
