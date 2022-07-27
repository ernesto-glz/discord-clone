import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';
import { generateSnowflake } from 'src/utils/snowflake';
import { Message } from 'src/data/models/message-model';
import { Channel } from 'src/data/models/channel-model';

export default class implements WSEvent<'MESSAGE_CREATE'> {
  public on = 'MESSAGE_CREATE' as const;

  public async invoke(ws: WSGateway, client: Socket, { channelId, content }: WS.Params.MessageCreate) {
    const senderId = ws.sessions.userId(client);

    const [message, sender] = await Promise.all([
      Message.create({ _id: generateSnowflake(), content, channelId, sender: senderId }),
      app.users.getSelf(senderId)
    ]);

    await Channel.updateOne({ _id: channelId }, { lastMessageId: message.id });

    sender.lastReadMessageIds ??= {};
    sender.lastReadMessageIds[channelId] = message.id;
    await sender.save();

    return [{
      emit: this.on,
      to: [channelId],
      send: { message }
    }];
  }
}
