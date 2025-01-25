import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Group creator
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
  totalMembers: { type: Number }, 
  createdAt: { type: Date, default: Date.now },
  groupChatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
});

const groupModel = mongoose.model('Group', GroupSchema);

export default groupModel;