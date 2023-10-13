import { Router } from 'express';
import userRouter from './userRouter';
import todoRouter from './todoRouter';

/**
 * Express router instance.
 *
 * @remarks
 * This router instance is used to define routes for the To-Do List application.
 */
export const router = Router();

router.use('/users', userRouter);
router.use('/todos', todoRouter);