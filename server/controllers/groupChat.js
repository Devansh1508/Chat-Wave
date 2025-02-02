import Group from '../models/groupSchema.js';
import User from '../models/userSchema.js';
import { groupChatModel } from '../models/chatSchema.js';

export const createGroup = async (req,res) => {
    try {
        // userIds should also involve the admin 
        const { userIds, groupName, admin } = req.body;
        if (!userIds || !groupName) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // checking valid user Id 
        const users = await User.find({ _id: { $in: userIds } }); 

        if (users.length !== userIds.length) {
            return res.status(400).json({ message: 'One or more users do not exist' });
        }

        // creating chatId for the group 
        const groupChat=await groupChatModel.create({messages:[]});
        const groupChatId=groupChat._id;
        const totalMembers=userIds.length;

        
        const newGroup = await Group.create({ name:groupName,admin:admin, members: userIds, totalMembers:totalMembers, groupChatId:groupChatId });
        await User.updateMany({_id:{$in:userIds}},{$push:{groups:newGroup._id}});

        res.status(201).json({newGroup});

    } catch (err) {
        console.log("error occured while creating a group",err); 
    }
}

export const addMember=async (req,res)=>{
    try {
        const { groupId, adminId, userId } = req.body;
        if (!groupId || !adminId || !userId) {
            return res.status(400).json({ message: 'Group ID, admin ID and User ID are required' });
        }

        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group || group.admin.toString()!==adminId) {
            return res.status(404).json({ message: 'Group not found or admin info is not correct' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already a member of the group
        if (group.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of the group' });
        }
        else{
            // updating user 
            await User.findByIdAndUpdate(userId,{$push:{groups:groupId}});
        }

        // Add the user to the group
        group.members.push(userId);
        group.totalMembers += 1;
        await group.save();

        res.status(200).json({ message: 'User added to the group', group });
    } catch (err) {
        console.log("error occurred while adding a member to the group", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const removeMember=async (req,res)=>{
    try {
        const { groupId, adminId, userId } = req.body;
        if (!groupId || !adminId || !userId) {
            return res.status(400).json({ message: 'Group ID, adminID and User ID are required' });
        }

        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group || group.admin.toString()!==adminId) {
            return res.status(404).json({ message: 'Group not found or admin info is not correct' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already a member of the group
        if (!group.members.includes(userId)) {
            return res.status(400).json({ message: 'User is not a member of the group' });
        }
        else{
            // updating user 
            await User.findByIdAndUpdate(userId,{$pull:{groups:groupId}});
        }
        
        
        await Group.findByIdAndUpdate(groupId,{$pull:{members:userId}, totalMembers:group.totalMembers-1});

        res.status(200).json({ message: 'User added to the group', group });
    } catch (err) {
        console.log("error occurred while adding a member to the group", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const { groupId, adminId } = req.body;
        if (!groupId || !adminId) {
            return res.status(400).json({ message: 'Group ID and admin ID are required' });
        }

        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group || group.admin.toString() !== adminId) {
            return res.status(404).json({ message: 'Group not found or admin info is not correct' });
        }

        // Remove the group from all members' group lists
        await User.updateMany({_id:{$in:group.members}},{$pull:{groups:groupId}});

        // Delete the group
        await Group.findByIdAndDelete(groupId);

        // Optionally, delete the associated group chat
        await groupChatModel.findByIdAndDelete(group.groupChatId);

        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (err) {
        console.log("error occurred while deleting the group", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const changeGroupProfilePicture = async (req, res) => {
    try {
        const { groupId, adminId, newProfilePicture } = req.body;
        if (!groupId || !adminId || !newProfilePicture) {
            return res.status(400).json({ message: 'Group ID, admin ID, and new profile picture are required' });
        }

        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group || group.admin.toString() !== adminId) {
            return res.status(404).json({ message: 'Group not found or admin info is not correct' });
        }

        // Update the group profile picture
        group.profilePicture = newProfilePicture;
        await group.save();

        res.status(200).json({ message: 'Group profile picture updated successfully', group });
    } catch (err) {
        console.log("error occurred while changing the group profile picture", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const changeGroupName = async (req, res) => {
    try {
        const { groupId, adminId, newGroupName } = req.body;
        if (!groupId || !adminId || !newGroupName) {
            return res.status(400).json({ message: 'Group ID, admin ID, and new group name are required' });
        }

        // Check if the group exists
        const group = await Group.findById(groupId);
        if (!group || group.admin.toString() !== adminId) {
            return res.status(404).json({ message: 'Group not found or admin info is not correct' });
        }

        // Update the group name
        group.name = newGroupName;
        await group.save();

        res.status(200).json({ message: 'Group name updated successfully', group });
    } catch (err) {
        console.log("error occurred while changing the group name", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}