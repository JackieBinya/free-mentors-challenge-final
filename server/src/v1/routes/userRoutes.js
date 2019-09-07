import { Router } from 'express';
import UserController from '../controllers/userController';
import Verify from '../middleware/verify';

const router = Router();

router.patch('/:userId', Verify.verifyAuthUser, Verify.verifyAdmin, Verify.checkUser, UserController.changeRole);

export default router;
