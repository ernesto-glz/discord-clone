import { ApiError } from 'api/errors/ApiError';
import { CreateDMChannel } from 'interfaces/Channel';
import { ApiResponses } from 'config/constants/api-responses';
import { ChannelTypes } from 'config/constants/status';
import { generateSnowflake } from 'utils';

export class ChannelService {
  static async createDM({ myId, userId }: CreateDMChannel) {
    const guildId = generateSnowflake();

    const channel = await app.channels.checkIfExistsDM(myId, userId);
    if (channel) return { channel, alreadyExists: true };

    const created = await app.channels.create({
      _id: generateSnowflake(),
      guildId,
      userIds: [myId, userId],
      createdBy: myId,
      type: ChannelTypes.DM
    });

    const fetched = await app.channels.findOneAndPopulate(
      {
        _id: created._id
      },
      'userIds'
    );

    await app.users.updateMany(
      {
        $or: [{ _id: myId }, { _id: userId }]
      },
      { $push: { guildIds: guildId, hiddenDMChannels: created._id } }
    );

    return { channel: fetched, alreadyExists: false };
  }

  static async getAll(userId: string) {
    const foundChannels = await app.channels.findAndPopulate(
      {
        userIds: userId
      },
      'userIds'
    );
    if (!foundChannels) throw new ApiError(400, ApiResponses.NO_CHANNELS_FOUND);
    return foundChannels;
  }

  static async getById(channelId: string) {
    const channel = await app.channels.findOne({ _id: channelId });
    if (!channel) throw new ApiError(400, ApiResponses.CHANNEL_NOT_FOUND);
    return channel;
  }
}
