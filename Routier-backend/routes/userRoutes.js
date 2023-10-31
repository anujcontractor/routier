import { Router } from 'express';
const router = Router();
import { authUser, registerUser, getUserProfile, logoutUser } from '../controller/userController.js';

router.get('/login', authUser);
router.get('/register', registerUser);
router.get('/profile', getUserProfile);
router.get('/logout', logoutUser);

export default router;