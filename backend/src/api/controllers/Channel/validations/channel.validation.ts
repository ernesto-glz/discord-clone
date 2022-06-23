import { check } from 'express-validator';
import { Validations } from 'config/constants/validation-errors';
import { NextFunction, Request, Response } from 'express';
import { validateResult } from 'utils/validate';

export const validateCreateChannel = [
  check('userId').custom((value) => {
    if (!value) throw new Error(Validations['Channel']['INVALID_GUILD_ID']);
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];