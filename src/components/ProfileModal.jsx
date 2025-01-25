import React from "react";

const ProfileModal = ({ contact, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center mb-6">
          <img
            src={contact.profilePhoto || "/placeholder.svg"}
            alt={contact.name}
            className="w-32 h-32 rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">{contact.name}</h3>
        </div>
        <div className="mb-6">
          <p>
            <strong>Phone:</strong> {contact.phoneNumber}
          </p>
          <p>
            <strong>Tagline:</strong> {contact.tagline}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Media Files</h4>
          <div className="grid grid-cols-3 gap-4">
            {contact.mediaFiles?.map((file, index) => (
              <img
                key={index}
                src={file || "/placeholder.svg"}
                alt={`Media ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
