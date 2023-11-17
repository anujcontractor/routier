import express from 'express';
import restaurantController from '../controller/restaurantController.js';
const router = express.Router();

router.get('/', restaurantController.index);
router.get('/show', restaurantController.show);
router.post('/store', restaurantController.store);
router.post('/update', restaurantController.update);
router.post('/destroy', restaurantController.destroy);

export default router;