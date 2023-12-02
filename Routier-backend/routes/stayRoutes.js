import express from 'express';
import StayController from '../controller/stayController.js';
const router = express.Router();

router.get('/', StayController.index);
router.get('/:id', StayController.show);
router.post('/store', StayController.register);
router.post('/updateTags', StayController.updateTags);

export default router;