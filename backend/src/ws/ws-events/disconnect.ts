import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'disconnect'> {
  public on = 'disconnect' as const;

  public async invoke(ws: WebSocket, client: Socket): Promise<any> {
    const userId = ws.sessions.get(client.id);
    const user = await deps.users.findById(userId);
    ws.sessions.delete(client.id);

    if (!user) return;

    user.status = 'OFFLINE';
    user.markModified('status');
    await user.save();

    return [
      {
        emit: 'PRESENCE_UPDATE' as const,
        to: user.guildIds,
        send: { userId: user.id, status: user.status }
      }
    ];
  }
}
