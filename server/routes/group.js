import express from 'express'
import { createGroup, addMember, removeMember } from '../controllers/groupChat.js'
import protect from '../middlewares/tokenCheck.js';

const router=express.Router();

router.post('/createGroup',protect,createGroup);
router.put('/addGroupMember',protect,addMember);
router.put('/removeGroupMember',protect,removeMember);

export default router