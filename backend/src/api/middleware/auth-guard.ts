import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';
import { ApiErrors } from 'config/constants/api-errors';

export const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new ApiError(401, ApiResponses.UNAUTHORIZED);
  const token = authHeader.split(' ')[1];
  let decoded: any;

  if (!process.env.JWT_SECRET_KEY) {
    console.log(ApiErrors.NO_JWT_SECRET_KEY);
    throw new Error(ApiErrors.NO_JWT_SECRET_KEY);
  }

  try {
    decoded = verify(token, process.env.JWT_SECRET_KEY);
  } catch (error: any) {
    if (error?.name === 'JsonWebTokenError' || decoded === undefined) {
      throw new ApiError(401, ApiResponses.INVALID_TOKEN);
    }

    if (error?.name === 'TokenExpiredError') {
      throw new ApiError(401, ApiResponses.TOKEN_EXPIRED);
    }

    if (error) {
      throw new ApiError(500, ApiResponses.SOMETHING_WRONG);
    }
  }

  const user = await app.users.findOne({ _id: decoded._id });

  if (!user) {
    throw new ApiError(401, ApiResponses.USER_NOT_FOUND);
  }

  res.locals.user = JSON.parse(JSON.stringify(user));
  next();
};
