import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validateResult } from 'utils/validate';
import { Validations } from 'config/constants/validation-errors';
import { patterns } from 'shared/patterns';

export const validateLogin = [
  check('email')
    .custom((value) => {
      if (!value) throw new Error(Validations['Auth']['EMAIL_REQUIRED']);
      if (!patterns.email.test(value)) throw new Error('Email is not in a valid format');
      return true;
    }),
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
      if (!patterns.email.test(value)) throw new Error('Email is not in a valid format');
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];
