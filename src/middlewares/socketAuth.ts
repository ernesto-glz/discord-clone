import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { UserRepository } from 'repositories/user.repository';
import { ApiErrors } from 'config/constants/api-errors';
import { ApiResponses } from 'config/constants/api-responses';

type SocketIo = Socket;
type SocketIoNext = (err?: ExtendedError | undefined) => void;

const userRepository = new UserRepository();
export const socketAuth = async (socket: SocketIo, next: SocketIoNext) => {
  const { token } = socket.handshake.query;
  if (!token) return next(new Error(ApiResponses.INVALID_TOKEN));
  let decoded: any;

  if (!process.env.JWT_SECRET_KEY) {
    return next(new Error(ApiErrors.NO_JWT_SECRET_KEY));
  }

  try {
    decoded = verify(token.toString(), process.env.JWT_SECRET_KEY);
  } catch (error: any) {
    if (error?.name === 'JsonWebTokenError' || decoded === undefined) {
      return next(new Error(ApiResponses.INVALID_TOKEN));
    }

    if (error?.name === 'TokenExpiredError') {
      return next(new Error(ApiResponses.TOKEN_EXPIRED));
    }

    if (error) {
      return next(new Error(ApiResponses.SOMETHING_WRONG));
    }
  }

  const user = await userRepository.findById(decoded._id);

  if (!user) {
    return next(new Error(ApiResponses.USER_NOT_FOUND));
  }

  socket.handshake.auth = { ...user?.toObject() };
  next();
};
