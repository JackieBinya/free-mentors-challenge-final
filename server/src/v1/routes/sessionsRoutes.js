import { Router } from 'express';
import Verify from '../middleware/verify';
import Validate from '../middleware/inputValidators';
import SessionsController from '../controllers/sessionsController';

const router = Router();

router.use(Verify.verifyAuthUser);

router.post('/', Verify.verifyUser, Verify.checkMentor, Validate.session, Verify.verifySessionUnique, SessionsController.createSession);
router.patch('/:sessionId/accept', Verify.verifyMentor, Verify.verifySession, Verify.verifyStatusAccept, SessionsController.acceptRequest);
router.patch('/:sessionId/reject', Verify.verifyMentor, Verify.verifySession, Verify.verifyStatusDecline, SessionsController.declineRequest);

export default router;
