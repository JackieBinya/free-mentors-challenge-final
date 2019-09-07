import { Router } from 'express';
import Verify from '../middleware/verify';
import SessionsController from '../controllers/sessionsController';

const router = Router();

router.use(Verify.verifyAuthUser);

router.post('/', Verify.verifyUser, Verify.checkMentor, SessionsController.createSession);
router.patch('/:sessionId/accept', Verify.verifyMentor, Verify.verifySession, Verify.verifyStatusAccept, SessionsController.acceptRequest);
router.patch('/:sessionId/reject', Verify.verifyMentor, Verify.verifySession, Verify.verifyStatusDecline, SessionsController.declineRequest);
router.get('/', Verify.verifyUser, SessionsController.fetchSessions);

export default router;
