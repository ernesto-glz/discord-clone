import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';
import { generateSnowflake } from 'utils/snowflake';

export default class implements WSEvent<'MESSAGE_CREATE'> {
  public on = 'MESSAGE_CREATE' as const;

  public async invoke(ws: WebSocket, client: Socket, { channelId, content }: WS.Params.MessageCreate) {
    const senderId = ws.sessions.userId(client);

    const [message, sender] = await Promise.all([
      app.messages.create({ _id: generateSnowflake(), content, channelId, sender: senderId }),
      app.users.getSelf(senderId)
    ]);

    await app.channels.updateOne({ _id: channelId }, { lastMessageId: message.id });

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
