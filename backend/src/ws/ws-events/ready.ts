import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'READY'> {
  public on = 'READY' as const;

  public async invoke(ws: WebSocket, client: Socket): Promise<any> {
    const user = await app.users.findById(client.data.user._id);
    if (!user) return 'User not found';
    client.join(user.guildIds);

    user.status = 'ONLINE';
    await user.save();

    return [
      {
        emit: this.on,
        to: client.id,
        send: {}
      },
      {
        emit: 'PRESENCE_UPDATE' as const,
        to: user.guildIds,
        send: { userId: user._id, status: user.status }
      }
    ];
  }
}
