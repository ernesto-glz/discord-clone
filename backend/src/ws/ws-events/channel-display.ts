import { WS } from '@discord/types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'CHANNEL_DISPLAY'> {
  public on = 'CHANNEL_DISPLAY' as const;

  public async invoke(ws: WebSocket, client: Socket, { channelId }: WS.Params.ChannelUpdate) {
    const userId = ws.sessions.userId(client) ?? '';

    const alreadyDisplayed = await app.users.findOne({ _id: userId, activeDMCS: channelId })

    if (!alreadyDisplayed) {
      await app.users.updateOne({ _id: userId }, { $push: { activeDMCS: channelId } });
    }

    return [{
      emit: this.on,
      to: [client.id],
      send: { channelId }
    }];
  }
}
