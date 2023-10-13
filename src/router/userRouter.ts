import express from 'express';
import { validate } from 'express-validation';
import UserController from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';
import { userValidation } from '../validations/userValidation';

const router = express.Router();

router.post('/register', validate(userValidation.register), UserController.register);
router.post('/login', validate(userValidation.login), UserController.login);
router.get('/profile', validate(userValidation.profile), verifyToken, UserController.profile);
router.delete('/delete', validate(userValidation.delete), verifyToken, UserController.delete);

export default router;
