import { Request, Response, NextFunction } from 'express';
import { ValidationErrorItem, ObjectSchema } from '@hapi/joi';

import { ErrorHandler } from '@helpers/ErrorHandler'

interface IRequest extends Request {
  [key: string]: any;
}

export const joiValidator = (schema: ObjectSchema<any>) => {
  return (req: IRequest, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      const details: ValidationErrorItem[] | undefined = error?.details;
      const message = details?.map((i: any) => i.message).join(',');
      next(new ErrorHandler(400, `INVALID PARAMS: ${message}`));
    }
  };
};
