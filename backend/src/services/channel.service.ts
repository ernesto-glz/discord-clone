import { ApiError } from 'errors/ApiError';
import { CreateDMChannel } from 'interfaces/Channel';
import { ChannelRepository } from 'repositories/channel.repository';
import { ApiResponses } from 'config/constants/api-responses';
import { UserRepository } from 'repositories/user.repository';
import { v4 } from 'uuid';
import { ChannelTypes } from 'config/constants/status';

export class ChannelService {
  private static channelRepository = new ChannelRepository();
  private static userRepository = new UserRepository();

  static async createDM({ myId, userId }: CreateDMChannel) {
    const guildId = v4();

    const channel = await this.channelRepository.checkDMExistance(myId, userId);
    if (channel) return { channel, alreadyExists: true };

    const created = await this.channelRepository.create({
      guildId,
      userIds: [myId, userId],
      createdBy: myId,
      type: ChannelTypes.DM_CHANNEL
    });

    const fetched = await this.channelRepository.findOneAndPopulate(
      {
        _id: created._id
      },
      'userIds'
    );

    await this.userRepository.updateMany(
      {
        $or: [{ _id: myId }, { _id: userId }]
      },
      { $push: { guildIds: guildId } }
    );

    return { channel: fetched, alreadyExists: false };
  }

  static async getAll(userId: string) {
    const foundChannels = await this.channelRepository.findAndPopulate(
      {
        userIds: userId
      },
      'userIds'
    );
    if (!foundChannels) throw new ApiError(400, ApiResponses.NO_CHANNELS_FOUND);
    return foundChannels;
  }

  static async getById(channelId: string) {
    const channel = await this.channelRepository.findOne({ _id: channelId });
    if (!channel) throw new ApiError(400, ApiResponses.CHANNEL_NOT_FOUND);
    return channel;
  }
}
