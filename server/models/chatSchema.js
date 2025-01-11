import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    user1Id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user2Id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    timestamp: { type: Date, default: Date.now },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});


const groupChatSchema=new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    timestamp: { type: Date, default: Date.now },
})

const chatModel=mongoose.model("Chat", ChatSchema);
const groupChatModel=mongoose.model("GroupChat",groupChatSchema);

export {chatModel,groupChatModel};