// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null }, // For group chats
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // For private chats
  timestamp: { type: Date, default: Date.now },
});

// module.exports = mongoose.model('Message', MessageSchema);
const messageModel= mongoose.model('Message', MessageSchema);

export default messageModel;
