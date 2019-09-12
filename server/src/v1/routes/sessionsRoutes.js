import { Router } from 'express';
import Verify from '../middleware/verify';
import Validate from '../middleware/inputValidators';
import SessionsController from '../controllers/sessionsController';

const router = Router();

router.use(Verify.verifyAuthUser);

router.post('/', Verify.verifyUser, Validate.session, Verify.checkMentor, Verify.verifySessionUnique, SessionsController.createSession);
router.patch('/:sessionId/accept', Verify.verifyMentor, Validate.sessionJoiVal, Verify.verifySession, Verify.verifyStatusAccept, SessionsController.acceptRequest);
router.patch('/:sessionId/reject', Verify.verifyMentor, Validate.sessionJoiVal, Verify.verifySession, Verify.verifyStatusDecline, SessionsController.declineRequest);

export default router;
