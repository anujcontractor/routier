import express from 'express';
import todoController from '../controller/todoController.js';
const router = express.Router();

router.get('/todo/:id', todoController.showbyid);


export default router;