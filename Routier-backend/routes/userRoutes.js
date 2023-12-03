import { Router } from 'express';
const router = Router();
import { authUser, registerUser, getUserProfile, logoutUser,show } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile',protect, getUserProfile);
router.post('/logout', logoutUser);
router.get('/:id', show);


export default router;