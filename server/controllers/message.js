import Message from '../models/messageSchema.js';
import Group from '../models/groupSchema.js';
import User from '../models/userSchema.js'
import { chatModel, groupChatModel } from '../models/chatSchema.js';

// Send a message
export const sendMessagePrivately = async (req, res) => {
    try {
        const { senderId, text, recipientId } = req.body;

        if (!senderId || !text || !recipientId) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const sender = await User.findById(senderId);
        const receiver = await User.findById(recipientId);

        if (!sender || !receiver) {
            return res.status(400).json({ message: 'sender or receiver do not exist' });
        }

        const message = await Message.create({ senderId, text, recipientId });


        const chat = await chatModel.findOneAndUpdate({ user1Id: senderId, user2Id: recipientId }, { $push: { messages: message._id } });
        if (!chat) {
            await chatModel.findOneAndUpdate({ user2Id: senderId, user1Id: recipientId }, { $push: { messages: message._id } });
        }
        else {
            await chatModel.create({ user1Id: senderId, user2Id: recipientId, messages: [message._id] });
        }

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error, while sending message privately', error });
    }
};

export const sendMessageGroup = async (req, res) => {
    try {
        const { senderId, text, groupId } = req.body;

        if (!senderId || !text || !groupId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: 'Group does not exist' });
        }
        const chatId = group.groupChatId;
        const message = await Message.create({ senderId, text, groupId });
        console.log(chatId);

        await groupChatModel.findByIdAndUpdate(chatId, { $push: { messages: message._id } });

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: 'Server error while sending message to the group', err });
    }
}

// Get messages for a chat
export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chatDetails = await chatModel.findById({ chatId });
        const messageIds = chatDetails.messages;
        const messages = await Message.find({ _id: { $in: messageIds } }).select('text').sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getGroupMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chatDetails = await groupChatModel.findById({ chatId });
        const messageIds = chatDetails.messages;
        // populate sender with name and email 
        const messages = await Message.find({ _id: { $in: messageIds } }).populate('senderId', 'name email profilePicture').select('text timestamp').sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
