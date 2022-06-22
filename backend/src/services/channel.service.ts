import { ApiError } from 'errors/ApiError';
import { CreateDMChannel } from 'interfaces/Channel';
import { ApiResponses } from 'config/constants/api-responses';
import { v4 } from 'uuid';
import { ChannelTypes } from 'config/constants/status';

export class ChannelService {
  static async createDM({ myId, userId }: CreateDMChannel) {
    const guildId = v4();

    const channel = await deps.channels.checkIfExistsDM(myId, userId);
    if (channel) return { channel, alreadyExists: true };

    const created = await deps.channels.create({
      guildId,
      userIds: [myId, userId],
      createdBy: myId,
      type: ChannelTypes.DM_CHANNEL
    });

    const fetched = await deps.channels.findOneAndPopulate(
      {
        _id: created._id
      },
      'userIds'
    );

    await deps.users.updateMany(
      {
        $or: [{ _id: myId }, { _id: userId }]
      },
      { $push: { guildIds: guildId, hiddenDMChannels: created._id } }
    );

    return { channel: fetched, alreadyExists: false };
  }

  static async getAll(userId: string) {
    const foundChannels = await deps.channels.findAndPopulate(
      {
        userIds: userId
      },
      'userIds'
    );
    if (!foundChannels) throw new ApiError(400, ApiResponses.NO_CHANNELS_FOUND);
    return foundChannels;
  }

  static async getById(channelId: string) {
    const channel = await deps.channels.findOne({ _id: channelId });
    if (!channel) throw new ApiError(400, ApiResponses.CHANNEL_NOT_FOUND);
    return channel;
  }
}
