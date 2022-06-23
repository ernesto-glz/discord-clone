import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validateResult } from 'utils/validate';
import { Validations } from 'config/constants/validation-errors';

export const validateCreateMessage = [
  check('channelId').custom((value) => {
    if (!value) throw new Error(Validations['Message']['CHANNEL_ID_REQUIRED']);
    return true;
  }),
  check('content').custom((value) => {
    if (!value) throw new Error(Validations['Message']['MESSAGE_CONTENT_REQUIRED']);
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];
