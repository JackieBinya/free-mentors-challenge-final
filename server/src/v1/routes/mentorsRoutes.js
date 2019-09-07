import { Router } from 'express';
import Verify from '../middleware/verify';
import MentorController from '../controllers/mentorController';

const router = Router();

router.use(Verify.verifyAuthUser);

router.get('/', MentorController.viewMentors);
router.get('/:mentorId', MentorController.viewSpecificMentor);

export default router;
