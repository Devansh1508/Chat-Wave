import express from 'express';
import protect from '../middlewares/tokenCheck.js';
import { getChatId } from '../controllers/chat.js';

const router = express.Router();
router.get('/getChatId', protect, getChatId);

export default router;