import express from 'express';
import TodoController from '../controllers/todoController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', verifyToken, TodoController.create);
router.get('/', verifyToken, TodoController.getAll);
router.get('/:id', verifyToken, TodoController.getOne);
router.put('/:id', verifyToken, TodoController.update);
router.delete('/:id', verifyToken, TodoController.delete);


export default router;
