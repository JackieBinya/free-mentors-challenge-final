/* eslint-disable consistent-return */
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
}

export default Validators;
