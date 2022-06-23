import { WS } from '@discord/types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'CHANNEL_DISPLAY'> {
  public on = 'CHANNEL_DISPLAY' as const;

  public async invoke(ws: WebSocket, client: Socket, { channelId }: WS.Params.ChannelHide): Promise<any> {
    const userId = ws.sessions.userId(client) ?? '';
    await app.users.updateOne({ _id: userId }, { $pull: { hiddenDMChannels: channelId } });

    return [
      {
        emit: this.on,
        to: [client.id],
        send: channelId
      }
    ];
  }
}
