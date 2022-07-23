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
}
