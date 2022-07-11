import { ApiError } from 'api/modules/api-error';
import { CreateRequest } from 'interfaces/Friend';
import { ApiResponses } from 'config/constants/api-responses';
import { ChannelService } from './channel-service';
import { generateSnowflake } from 'utils/snowflake';

export class FriendService {
  static async create({ from, username, discriminator }: CreateRequest) {
    const userFound = await app.users.findOne({
      discriminator,
      username
    });

    if (!userFound) throw new ApiError(400, ApiResponses['ERROR_CREATE_REQUEST']);
    else if (userFound.id === from) throw new ApiError(400, ApiResponses['ERROR_CREATE_REQUEST']);

    const alreadyRequest = await app.friends.checkExistence(from, userFound.id);

    if (alreadyRequest?.status === 'FRIEND') throw new ApiError(400, ApiResponses['ALREADY_FRIENDS']);
    else if (alreadyRequest) throw new ApiError(400, ApiResponses['REQUEST_ALREADY_EXISTS']);

    const created = await app.friends.create({
      _id: generateSnowflake(),
      from,
      to: userFound.id
    });

    return await app.friends.findOneAndPopulate({ _id: created.id }, ['from', 'to']);
  }

  static async remove(requestId: string, userId: string) {
    const request = await app.friends.findOneAndPopulate({
      _id: requestId,
      $or: [{ to: userId }, { from: userId }]
    }, ['from', 'to']);

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

    const created = await ChannelService.createDM({
      myId: request.from,
      userId: request.to
    });

    const result = await app.friends.findOneAndPopulate({ _id: request.id }, ['from', 'to']);

    return { request: result, channel: created.channel };
  }
}
