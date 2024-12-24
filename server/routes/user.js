import express from 'express';
import { registerUser, loginUser, getUserProfile, getUserStatus, updateUserProfile } from '../controllers/user.js';
const router=express.Router();

router.post('/registerUser',registerUser);
router.post('/loginUser',loginUser);
router.get('/getUserProfile',getUserProfile);
router.get('/getUserStatus/:userId',getUserStatus);
router.put('/updateUserProfile',updateUserProfile);

export default router;