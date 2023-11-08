import express from 'express';
import StayController from '../controller/stayController.js';
const router = express.Router();

router.get('./show', StayController.show);

export default router;