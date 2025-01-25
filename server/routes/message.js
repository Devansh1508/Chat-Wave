import express from 'express';
import { getMessages, sendMessageGroup, sendMessagePrivately, getGroupMessages } from "../controllers/message.js";
import protect from '../middlewares/tokenCheck.js';

const router=express.Router();

router.post('/sendMessagePrivately',protect,sendMessagePrivately);
router.post('/sendMessageGroup', protect, sendMessageGroup);
router.get('/getMessages/:chatId', protect, getMessages);
router.get('/getGroupMessages/:groupId', protect, getGroupMessages);

export default router;