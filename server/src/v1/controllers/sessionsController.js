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
      const rows = await Session.decline(sessionId);
      const mentees = await User.findByEmail(rows[0].mentee_email);
      return res.status(200).json({
        status: 200,
        message: 'SUCCESS',
        data: {
          sessionId: rows[0].id,
          mentorId: rows[0].mentor_id,
          menteeId: mentees[0].id,
          questions: rows[0].questions,
          menteeEmail: rows[0].mentee_email,
          status: rows[0].status,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err,
      });
    }
  }

  static async acceptRequest(req, res) {
    const { sessionId } = req.params;

    try {
      const rows = await Session.accept(sessionId);
      const mentees = await User.findByEmail(rows[0].mentee_email);
      return res.status(200).json({
        status: 200,
        message: 'SUCCESS',
        data: {
          sessionId: rows[0].id,
          mentorId: rows[0].mentor_id,
          menteeId: mentees[0].id,
          questions: rows[0].questions,
          menteeEmail: rows[0].mentee_email,
          status: rows[0].status,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err,
      });
    }
  }
}

export default SessionsController;
