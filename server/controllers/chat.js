import { chatModel } from "../models/chatSchema.js";

export const getChatId = async (req, res) => {
    try {
        const { user1Id, user2Id } = req.body;
    
        if (!user1Id || !user2Id) {
        return res.status(400).json({ message: "All fields are required" });
        }
    
        const chat1 = await chatModel
        .findOne({ user1Id, user2Id });
    
        if (!chat1) {
         const chat2 = await chatModel.findOne({ user1Id: user2Id, user2Id: user1Id });
            if (!chat2) {
                return res.status(404).json({ message: "Chat not found" });
            }
            res.status(200).json(chat2);
        }
    
        res.status(200).json(chat1);
    } catch (error) {
        res.status(500).json({ message: "Server error while getting chat", error });
    }
    };