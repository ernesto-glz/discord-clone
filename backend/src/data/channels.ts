import { Entity } from '@discord/types';
import { Channel, ChannelDocument } from 'src/data/models/channel-model';
import { User } from 'src/data/models/user-model';
import DBWrapper from './db-wrapper';

export default class Channels extends DBWrapper<string, ChannelDocument> {
  async checkIfExistsDM(selfId: string, userId: string) {
    return await Channel.findOne({
      $or: [
        { $and: [{ 'userIds.0': selfId }, { 'userIds.1': userId }] },
        { $and: [{ 'userIds.0': userId }, { 'userIds.1': selfId }] }
      ],
      type: 'DM'
    });
  }
  
  async fillInfo(channel: Entity.Channel, userId: string): Promise<Entity.Channel> {
    if (channel.type !== 'DM') return channel;
    const { userIds } = channel;
    const id = userIds[0] === userId ? userIds[1] : userIds[0];
    const user = await User.findById(id);
    return {
      ...channel,
      name:  user?.username ?? 'Deleted User',
      avatar: user?.avatar ?? 'unknown',
      dmUserId: user?.id ?? 'unknown'
    };
  }
}
