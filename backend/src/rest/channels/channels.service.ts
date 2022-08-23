import { BadRequestException, Injectable } from '@nestjs/common';
import { Channel } from 'src/data/models/channel-model';
import { Message } from 'src/data/models/message-model';
import { User } from 'src/data/models/user-model';
import { generateSnowflake } from 'src/utils/snowflake';

@Injectable()
export class ChannelsService {
  constructor() {}

  public async createDM(selfId: string, userId: string) {
    const guildId = generateSnowflake();

    const channel = await app.channels.getDM(selfId, userId);
    if (channel) return channel;

    const created = await Channel.create({
      _id: generateSnowflake(),
      guildId,
      userIds: [selfId, userId],
      createdBy: selfId,
      type: 'DM'
    });

    await User.updateMany(
      { $or: [{ _id: selfId }, { _id: userId }] },
      { $push: { guildIds: guildId, activeDMCS: created.id } }
    );

    return created;
  }

  async getMessages(channelId: string, userId: string, backSize: number) {
    const channel = await Channel.findOne({ _id: channelId });
    if (!channel) throw new BadRequestException(['No messages found']);

    const channelMsgs = await Message.find({ channelId });
    const batchSize = 30;
    const back = Math.max(channelMsgs.length - +(backSize || batchSize), 0);
    const slicedMsgs = channelMsgs.slice(back);

    if (!slicedMsgs.length) return { channelId, total: 0, list: [] };

    const lastMessage = slicedMsgs[slicedMsgs.length - 1];
    if (lastMessage.id === channel.lastMessageId) app.users.markAsRead(userId, lastMessage);

    return { channelId, total: channelMsgs.length, list: slicedMsgs };
  }
}
