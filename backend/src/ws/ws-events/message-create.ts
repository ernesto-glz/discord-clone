import { Entity, WS } from '@discord/types';
import { Socket } from 'socket.io';
import { WSEvent } from './ws-event';
import { generateSnowflake } from 'src/utils/snowflake';
import { Message } from 'src/data/models/message-model';
import { Channel } from 'src/data/models/channel-model';
import { User } from 'src/data/models/user-model';
import { moveToStart } from 'src/utils/utilts';

export default class implements WSEvent<'MESSAGE_CREATE'> {
  public on = 'MESSAGE_CREATE' as const;

  public async invoke(client: Socket, { channelId, content }: WS.Params.MessageCreate) {
    const senderId = ws.sessions.userId(client);

    const [message, sender] = await Promise.all([
      Message.create({ _id: generateSnowflake(), content, channelId, sender: senderId }),
      app.users.getSelf(senderId)
    ]);

    const channel = await Channel.findOne({ _id: channelId });

    sender.lastReadMessageIds ??= {};
    sender.lastReadMessageIds[channelId] = message.id;
    await sender.save();

    channel.lastMessageId = message.id;
    await channel.save();

    // Don't wait
    this.reOrderDms(channel);

    return [{
      emit: this.on,
      to: [channelId],
      send: { message }
    }];
  }

  private async reOrderDms(channel: Entity.Channel): Promise<void> {
    const { id: channelId, userIds, type } = channel;
    if (type !== 'DM') return;
    
    const users = await User.find({ $or: [{ _id: userIds[0] }, { _id: userIds[1] }] });
    if (!users.length) return;
    
    for (const user of users) {
      const DMS = moveToStart(user.activeDMCS, channelId);
      user.activeDMCS = DMS;
      await user.save();
    }
  }
}
