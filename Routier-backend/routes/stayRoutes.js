import express from 'express';
import StayController from '../controller/stayController.js';
const router = express.Router();

router.get('/', StayController.index);
router.get('/show', StayController.show);
router.post('/store', StayController.register);

export default router;