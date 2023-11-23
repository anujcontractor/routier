import express from 'express';
import todoController from '../controller/todoController.js';
const router = express.Router();

router.get('/', todoController.index);
router.post('/:id', todoController.show);
router.post('/store', todoController.store);
router.post('/update', todoController.update);
router.post('/destroy', todoController.destroy);


export default router;