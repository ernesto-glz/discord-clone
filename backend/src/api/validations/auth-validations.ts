import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validateResult } from 'utils/validate';
import { Validations } from 'config/constants/validation-errors';

const patterns = {
  // eslint-disable-next-line no-control-regex
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
}

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
