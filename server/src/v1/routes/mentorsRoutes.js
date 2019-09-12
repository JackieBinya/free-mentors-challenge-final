import { Router } from 'express';
import Verify from '../middleware/verify';
import MentorController from '../controllers/mentorController';
import Validate from '../middleware/inputValidators';

const router = Router();

router.use(Verify.verifyAuthUser);

router.get('/', MentorController.viewMentors);
router.get('/:mentorId', Validate.mentorJoiVal, MentorController.viewSpecificMentor);

export default router;
