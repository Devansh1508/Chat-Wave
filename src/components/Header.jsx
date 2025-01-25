import React from "react";

const Header = ({ name, profilePhoto, setShowProfile }) => {
  return (
    <div className="bg-blue-800 text-white p-4 flex items-center">
      <img
        src={profilePhoto || "/placeholder.svg"}
        alt={name}
        className="w-10 h-10 rounded-full mr-4 cursor-pointer"
        onClick={() => setShowProfile(true)}
      />
      <h2 className="text-xl font-bold">{name}</h2>
    </div>
  );
};

export default Header;
