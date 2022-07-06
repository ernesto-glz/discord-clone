import { ChannelTypes } from 'config/constants/status';
import { ChannelDocument } from 'interfaces/Channel';
import { Channel } from 'data/models/channel';
import { Entity } from '@discord/types';
import { Repository } from './Base';

export class ChannelRepository extends Repository<ChannelDocument> {
  constructor() {
    super(Channel);
  }

  async checkIfExistsDM(selfId: string, userId: string) {
    return await this.findOne({
      $or: [
        { $and: [{ 'userIds.0': selfId }, { 'userIds.1': userId }] },
        { $and: [{ 'userIds.0': userId }, { 'userIds.1': selfId }] }
      ],
      type: ChannelTypes.DM
    });
  }

  async fillInfo(channel: Entity.Channel, userId: string): Promise<Entity.Channel> {
    if (channel.type !== 'DM') return channel;
    const { userIds } = channel;
    const id = userIds[0] === userId ? userIds[1] : userIds[0];
    const user = await app.users.findById(id);
    return {
      ...channel,
      name:  user?.username ?? 'Deleted User',
      avatar: user?.avatar ?? 'unknown',
      dmUserId: user?._id ?? 'unknown'
    };
  }
}
