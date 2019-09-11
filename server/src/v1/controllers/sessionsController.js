import User from '../models/User';
import Session from '../models/Session';

class SessionsController {
  static async createSession(req, res) {
    const menteeId = req.decoded.payload;
    const { mentorId, questions } = req.body;

    try {
      const rows = await User.findOne(menteeId);
      const mentee = rows[0].email;

      const sessions = await Session.create({
        mentorId, questions, mentee,
      });

      return res.status(200).json({
        status: 200,
        message: 'SUCCESS',
        data: {
          sessionId: sessions[0].id,
          mentorId: sessions[0].mentor_id,
          menteeId: rows[0].id,
          questions: sessions[0].questions,
          menteeEmail: sessions[0].mentee_email,
          status: sessions[0].status,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err,
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
}

export default SessionsController;
