import { Socket } from 'socket.io';
import { User } from 'src/data/models/user-model';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'disconnect'> {
  public on = 'disconnect' as const;

  public async invoke(ws: WSGateway, client: Socket): Promise<any> {
    const userId = ws.sessions.userId(client);
    const user = await User.findById(userId);
    ws.sessions.delete(client.id);

    if (!user) return;

    const anotherSession = ws.sessions.isOnline(user.id);
    if (anotherSession) return;

    user.status = 'OFFLINE';
    await user.save();

    return [{
      emit: 'PRESENCE_UPDATE' as const,
      to: user.guildIds,
      send: { userId: user.id, status: user.status }
    }];
  }
}
