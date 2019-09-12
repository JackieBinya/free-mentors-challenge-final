import { Router } from 'express';
import UserController from '../controllers/userController';
import Verify from '../middleware/verify';
import Validate from '../middleware/inputValidators';

const router = Router();

router.patch('/:userId', Verify.verifyAuthUser, Verify.verifyAdmin, Validate.userJoiVal, Verify.checkUser, UserController.changeRole);

export default router;
