/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Session from '../models/Session';

class Verify {
  static verifyNewUser(req, res, next) {
    const user = User.findByEmail(req.body.email.trim());
    if (user) {
      return res.status(400).json({
        status: 400,
        error: 'Email already in use.',
      });
    }

    next();
  }

  static verifyExistingUser(req, res, next) {
    const user = User.findByEmail(req.body.email.trim());
    if (!user) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email',
      });
    }
    next();
  }

  static verifyAuthUser(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'No token access denied',
      });
    }

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          error: 'No authorisation, token invalid!',
        });
      }
      req.decoded = decoded;
      next();
    });
  }

  static checkUser(req, res, next) {
    const { userId } = req.params;
    const user = User.findOne(userId);
    if (!user) {
      return res.status(400).json({
        status: 400,
        error: `The user with id ${userId} does not exist in the app!`,
      });
    }
    next();
  }

  static verifyUser(req, res, next) {
    const userId = req.decoded.payload;
    const user = User.findOne(userId);
    if (!user) {
      return res.status(403).json({
        status: 403,
        error: `The user with id ${userId} does not exist in the app!`,
      });
    }
    next();
  }

  static verifyAdmin(req, res, next) {
    const id = req.decoded.payload;
    const user = User.findOne(id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        status: 403,
        error: 'Not an admin',
      });
    }
    next();
  }

  static checkMentor(req, res, next) {
    const { mentorId } = req.body;
    const mentor = User.findOne(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(400).json({
        status: 400,
        error: 'Not a mentor',
      });
    }
    next();
  }

  static verifyMentor(req, res, next) {
    const mentorId = req.decoded.payload;
    const mentor = User.findOne(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(403).json({
        status: 403,
        error: 'Not a mentor, no permission',
      });
    }
    next();
  }

  static verifySession(req, res, next) {
    const result = Session.findOne(req.params.sessionId);
    if (!result) {
      return res.status(400).json({
        status: 400,
        error: `The session with id ${req.params.sessionId} does not exist in the app!`,
      });
    }
    next();
  }

  static verifyStatusAccept(req, res, next) {
    const result = Session.findOne(req.params.sessionId);
    if (result.status === 'Accepted') {
      return res.status(400).json({
        status: 400,
        error: 'Session has already been accepted',
      });
    }
    next();
  }

  static verifyStatusDecline(req, res, next) {
    const result = Session.findOne(req.params.sessionId);
    if (result.status === 'Rejected') {
      return res.status(400).json({
        status: 400,
        error: 'Session has already been rejected',
      });
    }
    next();
  }
}

export default Verify;
