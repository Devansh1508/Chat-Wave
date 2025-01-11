import express from 'express';
import { getMessages, sendMessageGroup, sendMessagePrivately, getGroupMessages } from "../controllers/message";
import protect from '../middlewares/tokenCheck';

const router=express.Router();

router.post('/sendMessagePrivately',protect,sendMessagePrivately);
router.post('/sendMessageGroup', protect, sendMessageGroup);
router.get('/getMessages/:chatId', protect, getMessages);
router.get('/getGroupMessages/:groupId', protect, getGroupMessages);

export default router;