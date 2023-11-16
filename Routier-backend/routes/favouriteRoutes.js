import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controller/favourtieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/add',protect, addFavorite);
router.delete('/remove',protect, removeFavorite);
router.get('/user/:userId',protect, getFavorites);

export default router;
