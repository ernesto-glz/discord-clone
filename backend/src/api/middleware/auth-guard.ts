import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';

export const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new ApiError(401, ApiResponses.UNAUTHORIZED);
  const token = authHeader.split(' ')[1];
  let decoded: any;

  try {
    decoded = verify(token, process.env.JWT_SECRET_KEY);
  } catch (error: any) {
    if (error?.name === 'JsonWebTokenError')
      throw new ApiError(401, ApiResponses.INVALID_TOKEN);
    if (error?.name === 'TokenExpiredError') 
      throw new ApiError(401, ApiResponses.TOKEN_EXPIRED);

    throw new ApiError(500, ApiResponses.SOMETHING_WRONG);
  }

  const user = await app.users.findById(decoded.id);

  if (!user) throw new ApiError(401, ApiResponses.USER_NOT_FOUND);

  res.locals.user = user.toObject();
  next();
};
