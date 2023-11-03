import express from 'express';
import placeinfoController from '../controller/placeinfoController.js';
const router = express.Router();

router.get('/', placeinfoController.show);
router.get('/:id', placeinfoController.showbyid);

export default router;