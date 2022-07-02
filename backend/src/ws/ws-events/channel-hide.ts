import { WS } from '@discord/types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'CHANNEL_HIDE'> {
  public on = 'CHANNEL_HIDE' as const;

  public async invoke(ws: WebSocket, client: Socket, { channelId }: WS.Params.ChannelUpdate): Promise<any> {
    const userId = ws.sessions.userId(client) ?? '';
    await app.users.updateOne({ _id: userId }, { $push: { hiddenDMChannels: channelId } });

    return [
      {
        emit: this.on,
        to: [client.id],
        send: channelId
      }
    ];
  }
}
