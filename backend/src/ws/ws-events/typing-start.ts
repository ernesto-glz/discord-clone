import { Socket } from 'socket.io';
import { WSEvent } from './ws-event';
import { WS } from '@discord/types';

export default class implements WSEvent<'TYPING_START'> {
  public on = 'TYPING_START' as const;

  public async invoke(client: Socket, { channelId }: WS.Params.Typing) {
    if (!client.rooms.has(channelId)) await client.join(channelId);

    return [{
      emit: this.on,
      to: [channelId],
      send: { userId: ws.sessions.userId(client), channelId }
    }];
  }
}
