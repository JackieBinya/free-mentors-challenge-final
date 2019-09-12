import Joi from '@hapi/joi';
import schema from './schema';

class Validators {
  static signUp(req, res, next) {
    const { error } = Joi.validate(req.body, schema.signUpValidator);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    next();
  }

  static login(req, res, next) {
    const { error } = Joi.validate(req.body, schema.loginValidator);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    next();
  }

  static session(req, res, next) {
    const { error } = Joi.validate(req.body, schema.sessionValidator);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    next();
  }

  static mentorJoiVal(req, res, next) {
    const { error } = Joi.validate(req.params, schema.mentorIdValidator);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: 'Mentor id must be a number',
      });
    }
    next();
  }

  static sessionJoiVal(req, res, next) {
    const { error } = Joi.validate(req.params, schema.sessionIdValidator);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: 'Session id must be a number',
      });
    }
    next();
  }

  static userJoiVal(req, res, next) {
    const { error } = Joi.validate(req.params, schema.userIdValidator);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: 'User id must be a number',
      });
    }
    next();
  }
}

export default Validators;
