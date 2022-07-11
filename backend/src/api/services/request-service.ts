import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';
import { ChannelService } from './channel-service';
import { generateSnowflake } from 'utils/snowflake';

export class RequestService {
  static async create({ from, username, discriminator, selfUser }) {
    const userFound = await app.users.findOne({ username, discriminator });

    if (!userFound) 
      throw new ApiError(400, ApiResponses['ERROR_CREATE_REQUEST']);
    else if (userFound.id === from) 
      throw new ApiError(400, ApiResponses['ERROR_CREATE_REQUEST']);

    const alreadyRequest = await app.requests.checkExistence(from, userFound.id);

    if (selfUser.friendIds.includes(userFound.id))
      throw new ApiError(400, ApiResponses['ALREADY_FRIENDS']);
    else if (alreadyRequest) 
      throw new ApiError(400, ApiResponses['REQUEST_ALREADY_EXISTS']);

    const created = await app.requests.create({
      _id: generateSnowflake(),
      from,
      to: userFound.id
    });

    return await app.requests.findOneAndPopulate({ _id: created.id }, ['from', 'to']);
  }

  static async remove(requestId: string, userId: string) {
    const request = await app.requests.findOneAndPopulate({
      _id: requestId,
      $or: [{ to: userId }, { from: userId }]
    }, ['from', 'to']);
    
    if (!request) 
      throw new ApiError(400, ApiResponses['REQUEST_NOT_FOUND']);

    await app.requests.findByIdAndDelete(requestId)
    return request;
  }

  static async accept(requestId: string, userId: string) {
    const request = await app.requests.findOne({
      _id: requestId,
      to: userId
    });

    if (!request)
      throw new ApiError(400, ApiResponses['REQUEST_NOT_FOUND']);

    const deleted = await app.requests.findByIdAndDelete(requestId);

    if (!deleted)
      throw new ApiError(500, ApiResponses['SOMETHING_WRONG']);

    await app.users.updateOne({ _id: request.from }, {
      $push: { friendIds: request.to }
    });
    
    await app.users.updateOne({ _id: request.to }, {
      $push: { friendIds: request.from }
    });

    const createdDM = await ChannelService.createDM({
      selfId: request.from,
      userId: request.to
    });

    return { friendId: request.from, channel: createdDM.channel };
  }
}
