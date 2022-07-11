import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';
import { generateSnowflake } from 'utils/snowflake';

export class ChannelService {
  static async createDM({ selfId, userId }) {
    const guildId = generateSnowflake();

    const channel = await app.channels.checkIfExistsDM(selfId, userId);
    if (channel) return { channel, alreadyExists: true };

    const created = await app.channels.create({
      _id: generateSnowflake(),
      guildId,
      userIds: [selfId, userId],
      createdBy: selfId,
      type: 'DM'
    });

    await app.users.updateMany(
      { $or: [{ _id: selfId }, { _id: userId }] },
      { $push: { guildIds: guildId } }
    );

    return { channel: created, alreadyExists: false };
  }

  static async getAll(userId: string) {
    return await app.channels.find({ userIds: userId });
  }

  static async getById(channelId: string) {
    const channel = await app.channels.findOne({ _id: channelId });
    if (!channel) throw new ApiError(400, ApiResponses.CHANNEL_NOT_FOUND);
    return channel;
  }
}
