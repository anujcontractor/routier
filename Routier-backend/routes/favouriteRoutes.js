import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controller/favourtieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/add',protect, addFavorite);
router.delete('/delete',protect, removeFavorite);
router.get('/',protect, getFavorites);

export default router;
