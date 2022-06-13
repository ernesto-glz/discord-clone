import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { ApiErrors } from 'config/constants/api-errors';
import { ApiResponses } from 'config/constants/api-responses';
import { FriendService } from 'services/friend.service';
import { RoomService } from 'services/room.service';
import { UserService } from 'services/user.service';

type SocketIo = Socket;
type SocketIoNext = (err?: ExtendedError | undefined) => void;

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

  try {
    const user = await UserService.getUser(decoded._id);
    const channels = await RoomService.getAllRooms(decoded._id, false);
    const friends = await FriendService.getFriends(decoded._id, false);

    if (!user) {
      return next(new Error(ApiResponses.USER_NOT_FOUND));
    }

    socket.data.user = JSON.parse(JSON.stringify(user));
    socket.data.channels = channels ? JSON.parse(JSON.stringify(channels)) : [];
    socket.data.friends = friends ? JSON.parse(JSON.stringify(friends)) : [];
    next();
  } catch (error) {
    if (error) {
      return next(new Error(ApiResponses.SOMETHING_WRONG));
    }
  }
};
