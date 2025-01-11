import express from 'express';
import protect from '../middlewares/tokenCheck.js';
import { registerUser, loginUser, getUserProfile, getUserStatus, updateUserProfile } from '../controllers/user.js';
const router=express.Router();

router.post('/registerUser',registerUser);
router.post('/loginUser',loginUser);
router.get('/getUserProfile',protect, getUserProfile);
router.get('/getUserStatus/:userId',protect, getUserStatus);
router.put('/updateUserProfile',protect, updateUserProfile);
        
export default router;