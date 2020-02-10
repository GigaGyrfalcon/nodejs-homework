import Joi from 'joi';

export function groupSchema(required: boolean): Joi.ObjectSchema {
  return Joi.object().keys({
    name: required
      ? Joi.string()
          .required()
          .error(() => new Error('Name is not valid'))
      : Joi.string().error(() => new Error('Name is not valid')),
    permissions: Joi.array()
      .items(Joi.strict())
      .error(() => new Error('Permissions are not valid'))
  });
}
