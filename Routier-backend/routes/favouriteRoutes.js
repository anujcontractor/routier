import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controller/favourtieController.js';

const router = Router();

router.post('/add', addFavorite);
router.delete('/remove', removeFavorite);
router.get('/user/:userId', getFavorites);

export default router;
