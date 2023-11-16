import { Router } from 'express';
const router = Router();
import { authUser, registerUser, getUserProfile, logoutUser } from '../controller/userController.js';

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile', getUserProfile);
router.post('/logout', logoutUser);

export default router;