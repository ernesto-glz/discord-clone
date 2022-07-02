import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';
import { WS } from '@discord/types';

export default class implements WSEvent<'TYPING_STOP'> {
  public on = 'TYPING_STOP' as const;

  public async invoke(ws: WebSocket, client: Socket, { channelId }: WS.Params.Typing): Promise<any> {
    if (!client.rooms.has(channelId)) await client.join(channelId);

    return [{
      emit: this.on,
      to: [channelId],
      send: { userId: ws.sessions.userId(client), channelId }
    }];
  }
}
