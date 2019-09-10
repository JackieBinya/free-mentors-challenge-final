import jwt from 'jsonwebtoken';
import User from '../models/User';
import Session from '../models/Session';

class Verify {
  static async verifyNewUser(req, res, next) {
    try {
      const rows = await User.findByEmail(req.body.email.trim());
      if (rows.length) {
        return res.status(400).json({
          status: 400,
          error: 'Email already in use.',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }

    next();
  }

  static async verifyExistingUser(req, res, next) {
    try {
      const rows = await User.findByEmail(req.body.email.trim());
      if (!rows.length) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid email',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
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

  static async checkUser(req, res, next) {
    const { userId } = req.params;
    try {
      const rows = await User.findOne(userId);
      if (!rows.length) {
        return res.status(400).json({
          status: 400,
          error: `The user with id ${userId} does not exist in the app!`,
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 500,
        error: err,
      });
    }

    next();
  }

  static async verifyUser(req, res, next) {
    const userId = req.decoded.payload;
    try {
      const rows = await User.findOne(userId);
      if (!rows.length) {
        return res.status(403).json({
          status: 403,
          error: `The user with id ${userId} does not exist in the app!`,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err,
      });
    }

    next();
  }

  static async verifyAdmin(req, res, next) {
    const id = req.decoded.payload;
    try {
      const rows = await User.findOne(id);

      if (!rows.length || !rows[0].is_admin) {
        return res.status(403).json({
          status: 403,
          error: 'Not an admin',
        });
      }
    } catch (err) {
      console.log('/////////////////////////////');
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }

    next();
  }

  static async checkMentor(req, res, next) {
    const { mentorId } = req.body;
    try {
      const rows = User.findOne(mentorId);
      if (!rows.length || rows[0].role !== 'mentor') {
        return res.status(400).json({
          status: 400,
          error: 'Not a mentor',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }
    next();
  }

  static async verifyMentor(req, res, next) {
    const mentorId = req.decoded.payload;
    try {
      const rows = await User.findOne(mentorId);
      if (!rows.length || rows[0].role !== 'mentor') {
        return res.status(403).json({
          status: 403,
          error: 'Not a mentor, no permission',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }

    next();
  }

  static async verifySession(req, res, next) {
    try {
      const rows = await Session.findOne(req.params.sessionId);
      if (!rows.length) {
        return res.status(400).json({
          status: 400,
          error: `The session with id ${req.params.sessionId} does not exist in the app!`,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }

    next();
  }

  static async verifyStatusAccept(req, res, next) {
    try {
      const rows = await Session.findOne(req.params.sessionId);
      if (rows[0].status === 'Accepted') {
        return res.status(400).json({
          status: 400,
          error: 'Session has already been accepted',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }

    next();
  }

  static async verifyStatusDecline(req, res, next) {
    try {
      const rows = await Session.findOne(req.params.sessionId);
      if (rows.status === 'Rejected') {
        return res.status(400).json({
          status: 400,
          error: 'Session has already been rejected',
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.error,
      });
    }

    next();
  }
}

export default Verify;
