import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validateResult } from 'utils/validate';
import { MessageValidation } from 'config/constants/validation-errors';

export const validateCreateMessage = [
  check('roomId').custom((value) => {
    if (!value) throw new Error(MessageValidation.ROOM_ID_REQUIRED);
    return true;
  }),
  check('content').custom((value) => {
    if (!value) throw new Error(MessageValidation.MESSAGE_CONTENT_REQUIRED);
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  }
];
