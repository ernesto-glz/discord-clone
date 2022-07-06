import { FriendStatus } from 'config/constants/status';
import { ApiError } from 'api/errors/ApiError';
import { CreateRequest } from 'interfaces/Friend';
import { ApiResponses } from 'config/constants/api-responses';
import { ChannelService } from './channel-service';
import { generateSnowflake } from 'utils';

export class FriendService {
  static async create({ from, username, discriminator }: CreateRequest) {
    const userFound = await app.users.findOne({
      discriminator,
      username
    });

    if (!userFound) throw new ApiError(400, ApiResponses['ERROR_CREATE_REQUEST']);
    else if (userFound._id === from) throw new ApiError(400, ApiResponses['ERROR_CREATE_REQUEST']);

    const alreadyRequest = await app.friends.checkExistence(from, userFound._id);

    if (alreadyRequest?.status === FriendStatus['FRIEND'])
      throw new ApiError(400, ApiResponses['ALREADY_FRIENDS']);
    else if (alreadyRequest) throw new ApiError(400, ApiResponses['REQUEST_ALREADY_EXISTS']);

    const created = await app.friends.create({
      _id: generateSnowflake(),
      from,
      to: userFound._id
    });

    return await app.friends.findOneAndPopulate({ _id: created._id }, 'from', 'to');
  }

  static async remove(requestId: string, userId: string) {
    const request = await app.friends.findOneAndPopulate({
      _id: requestId,
      $or: [{ to: userId }, { from: userId }]
    }, 'from', 'to');

    if (!request) throw new ApiError(400, ApiResponses['REQUEST_NOT_FOUND']);

    await app.friends.findByIdAndDelete(requestId)
    return request;
  }

  static async accept(requestId: string, userId: string) {
    const request = await app.friends.findOne({
      _id: requestId,
      to: userId
    });

    if (!request) throw new ApiError(400, ApiResponses['REQUEST_NOT_FOUND']);

    const updated = await app.friends.acceptFriendRequest(requestId);
    if (!updated) throw new ApiError(500, ApiResponses['SOMETHING_WRONG']);

    const result = await ChannelService.createDM({
      myId: request.from,
      userId: request.to
    });

    const populated = await app.friends.findOneAndPopulate({ _id: request._id }, 'from', 'to');

    return { request: populated, channel: result.channel };
  }
}
