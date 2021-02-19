import { Request,Response,NextFunction } from 'express';
import Joi from 'joi';
import { validateRequest } from './validate-request';

const authenticateSchema = (req: Request, res: Response, next: NextFunction): void => {
  const schema: Joi.ObjectSchema<any> = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

export { authenticateSchema };
