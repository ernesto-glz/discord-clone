import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validateResult } from 'utils/validate';
import { Validations } from 'config/constants/validation-errors';

export const validateCreateFR = [
  check('username').custom((value) => {
    if (!value) throw new Error(Validations['Friend']['USERNAME_REQUIRED']);
    return true;
  }),
  check('discriminator').custom((value) => {
    if (!value) throw new Error(Validations['Friend']['ID_REQUIRED']);
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];
