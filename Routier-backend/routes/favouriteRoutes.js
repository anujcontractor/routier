import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controller/favourtieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/',protect, addFavorite);
router.delete('/:id',protect, removeFavorite);
router.get('/user/:id/favorites',protect, getFavorites);

export default router;
