import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validateResult } from 'utils/validate';
import { Validations } from 'config/constants/validation-errors';

export const validateLogin = [
  check('email')
    .custom((value) => {
      if (!value) throw new Error(Validations['Auth']['EMAIL_REQUIRED']);
      return true;
    })
    .isEmail(),
  check('password').custom((value) => {
    if (!value) throw new Error(Validations['Auth']['PASSWORD_REQUIRED']);
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];

export const validateRegister = [
  check('username').custom((value) => {
    if (!value) throw new Error(Validations['Auth']['INVALID_USERNAME']);
    if (value.length < 3) throw new Error('Min length(3)');
    return true;
  }),
  check('password').custom((value) => {
    if (!value) throw new Error(Validations['Auth']['INVALID_PASSWORD']);
    if (value.length < 3) throw new Error('Min length(3)');
    return true;
  }),
  check('email')
    .custom((value) => {
      if (!value) throw new Error(Validations['Auth']['INVALID_EMAIL']);
      return true;
    })
    .isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];
