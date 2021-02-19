import { Request, NextFunction } from 'express';
import Joi from 'joi';

const validateRequest = (req: Request, next: NextFunction, schema: Joi.ObjectSchema<any>): void => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x: { message: any }) => x.message).join(', ')}`);
  } else {
    req.body = value;
    next();
  }
};
export { validateRequest };
