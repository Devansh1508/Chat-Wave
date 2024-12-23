import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Group creator
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
  createdAt: { type: Date, default: Date.now },
});

const groupModel = mongoose.model('Group', GroupSchema);

export default groupModel;