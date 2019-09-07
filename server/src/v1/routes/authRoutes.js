import { Router } from 'express';
import Validators from '../middleware/inputValidators';
import UserController from '../controllers/userController';
import Verify from '../middleware/verify';

const router = Router();

router.post('/signup', Validators.signUpValidator, Verify.verifyNewUser, UserController.createNewUser);
router.post('/signin', Validators.loginValidator, Verify.verifyExistingUser, UserController.authUser);

export default router;
