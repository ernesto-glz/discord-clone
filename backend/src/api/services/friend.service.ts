import { FriendStatus } from 'config/constants/status';
import { ApiError } from 'api/errors/ApiError';
import { CreateFriendRequest } from 'interfaces/Friend';
import { ApiResponses } from 'config/constants/api-responses';
import { ChannelService } from './channel.service';

export class FriendService {
  static async createFriendRequest({ from, toUsername, toShortId }: CreateFriendRequest) {
    const userFound = await app.users.findOne({
      username: toUsername,
      shortId: toShortId
    });

    if (!userFound) {
      throw new ApiError(400, ApiResponses.ERROR_CREATE_REQUEST);
    }

    if (userFound._id.toString() === from.toString()) {
      throw new ApiError(400, ApiResponses.ERROR_CREATE_REQUEST);
    }

    const alreadyRequest = await app.friends.checkExistence(from, userFound._id);

    if (alreadyRequest) {
      if (alreadyRequest.friend_status === FriendStatus.FRIEND) {
        throw new ApiError(400, ApiResponses.ALREADY_FRIENDS);
      }
      throw new ApiError(400, ApiResponses.REQUEST_ALREADY_EXISTS);
    }

    const created = await app.friends.create({
      from,
      to: userFound._id
    });

    return await app.friends.findOneAndPopulate({ _id: created._id }, 'from', 'to');
  }

  static async getPendingRequests(userId: string) {
    return await app.friends.getPendingRequests(userId);
  }

  static async getOutgoingRequests(userId: string) {
    return await app.friends.getOutgoingRequests(userId);
  }

  static async deleteFriendRequest(requestId: string, userId: string) {
    const requestExists = await app.friends.findOne({
      _id: requestId,
      $or: [{ to: userId }, { from: userId }]
    });

    if (!requestExists) throw new ApiError(400, ApiResponses.REQUEST_NOT_FOUND);

    return await app.friends.findByIdAndDelete(requestId);
  }

  static async acceptFriendRequest(requestId: string, userId: string) {
    const request = await app.friends.findOne({
      _id: requestId,
      to: userId
    });

    if (!request) throw new ApiError(400, ApiResponses.REQUEST_NOT_FOUND);

    const updated = await app.friends.acceptFriendRequest(requestId);
    if (!updated) throw new ApiError(500, ApiResponses.SOMETHING_WRONG);

    const result = await ChannelService.createDM({
      myId: request.from,
      userId: request.to
    });

    const populated = await app.friends.findOneAndPopulate({ _id: request._id }, 'from', 'to');

    return { request: populated, channel: result.channel };
  }

  static async getFriends(userId: string, extraInfo: boolean) {
    const friends = await app.friends.getFriends(userId);

    if (!friends) throw new ApiError(400, ApiResponses.NO_FRIENDS);

    if (!friends.length) return friends;

    if (!extraInfo) {
      return friends.map((entity: any) => {
        if (entity.from._id.toString() === userId.toString()) {
          return entity.to;
        }
        return entity.from;
      });
    }

    return friends;
  }
}
