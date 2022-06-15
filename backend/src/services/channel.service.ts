import { ApiError } from 'errors/ApiError';
import { CreateDMChannel } from 'interfaces/Channel';
import { ChannelRepository } from 'repositories/channel.repository';
import { ApiResponses } from 'config/constants/api-responses';

export class ChannelService {
  private static channelRepository = new ChannelRepository();

  static async createDM({ guildId, myId, userId }: CreateDMChannel) {
    const channel = await this.channelRepository.checkExistence(
      guildId,
      userId
    );
    if (channel) return { channel, alreadyExists: true };

    const created = await this.channelRepository.create({
      guildId,
      userIds: [myId, userId],
      createdBy: myId
    });

    const fetched = await this.channelRepository.findOneAndPopulate(
      {
        _id: created._id
      },
      'userIds'
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
