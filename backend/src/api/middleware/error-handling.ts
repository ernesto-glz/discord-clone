import { NextFunction, Request, Response } from 'express';
import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';

export const apiErrorHandler = (
  err: TypeError | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) next();
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }
  console.log(err);
  res.status(500).json(ApiResponses.SOMETHING_WRONG);
};
