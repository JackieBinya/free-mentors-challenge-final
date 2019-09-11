import Joi from '@hapi/joi';

const schema = {
  signUpValidator: Joi.object().keys({
    firstName: Joi.string().trim().regex(/[a-zA-Z]{3,30}/)
      .required(),
    lastName: Joi.string().trim().regex(/[a-zA-Z]{3,30}/)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).required(),
    address: Joi.string().trim().min(3).max(128)
      .required(),
    occupation: Joi.string().trim().min(3).max(200)
      .required(),
    bio: Joi.string().trim().min(3).max(800)
      .required(),
    expertise: Joi.string().trim().min(3).max(200)
      .required(),
  }),

  loginValidator: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).required(),
  }),

  sessionValidator: Joi.object().keys({
    mentorId: Joi.number().integer().positive(),
    questions: Joi.string().trim().min(3).max(200)
      .required(),
  }),
};

export default schema;
