import Joi from 'joi';

export function schema(required: boolean): Joi.ObjectSchema {
  return Joi.object().keys({
    login: required
      ? Joi.string()
          .required()
          .error(() => new Error('Login is not valid'))
      : Joi.string().error(() => new Error('Login is not valid')),
    password: required
      ? Joi.string()
          .regex(/^[a-zA-Z0-9]{6,16}$/)
          .min(6)
          .required()
          .error(() => new Error('Password is not valid'))
      : Joi.string()
          .regex(/^[a-zA-Z0-9]{6,16}$/)
          .min(6)
          .error(() => new Error('Password is not valid')),
    age: required
      ? Joi.number()
          .integer()
          .min(4)
          .max(130)
          .required()
          .error(() => new Error('Age is not valid'))
      : Joi.number()
          .integer()
          .min(4)
          .max(130)
          .error(() => new Error('Age is not valid'))
  });
}
