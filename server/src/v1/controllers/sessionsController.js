import User from '../models/User';
import Session from '../models/Session';

class SessionsController {
  static async createSession(req, res) {
    const menteeId = req.decoded.payload;
    const { mentorId, questions } = req.body;

    try {
      const { id: sessionId, status, menteeEmail } = await Session.create({
        mentorId, questions, menteeId,
      });

      return res.status(200).json({
        status: 200,
        message: 'SUCCESS',
        data: {
          sessionId,
          mentorId,
          menteeId,
          questions,
          menteeEmail,
          status,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }

  static async declineRequest(req, res) {
    const { sessionId } = req.params;

    try {
      const {
        mentor_id: mentorId, mentee_id: menteeId, questions, email: menteeEmail, status,
      } = await Session.decline(sessionId);

      return res.status(200).json({
        status: 200,
        message: 'SUCCESS',
        data: {
          sessionId,
          mentorId,
          menteeId,
          questions,
          menteeEmail,
          status,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }

  static async acceptRequest(req, res) {
    const { sessionId } = req.params;

    try {
      const {
        mentorId, menteeId, questions, menteeEmail, status,
      } = Session.accept(sessionId);

      return res.status(200).json({
        status: 200,
        message: 'SUCCESS',
        data: {
          sessionId,
          mentorId,
          menteeId,
          questions,
          menteeEmail,
          status,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }

  static async fetchSessions(req, res) {
    const userId = req.decoded.payload;

    try {
      const rows = await User.findOne(userId);

      if (rows[0].role === 'user') {
        const sessions = await Session.findMenteeSessions(userId);
        if (sessions.length) {
          const newSessions = sessions.map(({
            id: sessionId, mentor_id: mentorId, mentee_id: menteeId, email: menteeEmail,
            questions, status, created_on: createdOn,
          }) => ({
            sessionId, mentorId, menteeId, questions, menteeEmail, status, createdOn,
          }));
          return res.status(200).json({
            status: 200,
            message: 'SUCCESS',
            data: newSessions,
          });
        }

        res.status(404).json({
          status: 404,
          error: 'Sessions not found',
        });
      }

      if (rows[0].role === 'mentor') {
        const sessions = Session.findMentorSessions(userId);
        if (sessions.length) {
          const newSessions = sessions.map(({
            id: sessionId, mentor_id: mentorId, mentee_id: menteeId, email: menteeEmail,
            questions, status, created_on: createdOn,
          }) => ({
            sessionId, mentorId, menteeId, questions, menteeEmail, status, createdOn,
          }));
          return res.status(200).json({
            status: 200,
            message: 'SUCCESS',
            data: newSessions,
          });
        }

        return res.status(404).json({
          status: 404,
          error: 'Sessions not found',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
  }
}

export default SessionsController;
