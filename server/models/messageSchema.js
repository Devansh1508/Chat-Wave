// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, 
  timestamp: { type: Date, default: Date.now },
});

const messageModel= mongoose.model('Message', MessageSchema);

export default messageModel;
