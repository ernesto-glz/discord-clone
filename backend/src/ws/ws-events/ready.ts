import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';
import { verify } from 'jsonwebtoken';
import { WS } from '@discord/types';

export default class implements WSEvent<'READY'> {
  public on = 'READY' as const;

  public async invoke(ws: WebSocket, client: Socket, { jwt }: WS.Params.Ready) {
    const user = await app.users.findById(this.getUserIdFromToken(jwt));
    
    if (!user) 
      throw new TypeError('User not found');

    ws.sessions.set(client.id, user.id);

    await app.rooms.joinGuildRooms(user, client);
    user.status = 'ONLINE';
    await user.save();

    return [{
      emit: this.on,
      to: [client.id],
      send: { user }
    }, {
      emit: 'PRESENCE_UPDATE' as const,
      to: user.guildIds,
      send: { userId: user.id, status: user.status }
    }];
  }

  private getUserIdFromToken(jwt: string) {
    const decoded = verify(jwt, process.env.JWT_SECRET_KEY) as { id: string };
    return decoded.id;
  }
}
