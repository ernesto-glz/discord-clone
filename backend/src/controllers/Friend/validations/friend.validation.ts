import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validateResult } from 'utils/validate';
import { FriendValidation } from 'config/constants/validation-errors';

export const validateCreateFR = [
  check('toUsername').custom((value) => {
    if (!value) throw new Error(FriendValidation.USERNAME_REQUIRED);
    return true;
  }),
  check('toShortId').custom((value) => {
    if (!value) throw new Error(FriendValidation.ID_REQUIRED);
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];
