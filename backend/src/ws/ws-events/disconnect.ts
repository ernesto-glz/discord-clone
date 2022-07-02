import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'disconnect'> {
  public on = 'disconnect' as const;

  public async invoke(ws: WebSocket, client: Socket): Promise<any> {
    const userId = ws.sessions.get(client.id);
    const user = await app.users.findById(userId);
    ws.sessions.delete(client.id);

    if (!user) return;

    const anotherInstance = ws.sessions.isOnline(user._id);
    if (anotherInstance) return;

    user.status = 'OFFLINE';
    await user.save();

    return [{
      emit: 'PRESENCE_UPDATE' as const,
      to: user.guildIds,
      send: { userId: user.id, status: user.status }
    }];
  }
}
