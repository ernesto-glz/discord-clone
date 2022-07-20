import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';
import { WS } from '@discord/types';

export default class implements WSEvent<'USER_UPDATE'> {
  public on = 'USER_UPDATE' as const;

  public async invoke(ws: WebSocket, client: Socket, { userId, partialUser }: WS.Params.UserUpdate) {
    const user = await app.users.findById(userId);

    if (!user)
      throw new TypeError('User not found');

    return [{
      emit: this.on,
      to: user.guildIds,
      send: { userId, partialUser }
    }];
  }
}
