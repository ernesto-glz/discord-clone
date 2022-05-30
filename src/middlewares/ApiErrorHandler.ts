import { NextFunction, Request, Response } from 'express';
import { ApiError } from 'errors/ApiError';
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
  console.log(err.message);
  res.status(500).json(ApiResponses.SOMETHING_WRONG);
};
