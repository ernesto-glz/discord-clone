import { Socket } from 'socket.io';
import { WSEvent } from './ws-event';
import { WS } from '@discord/types';
import { User } from 'src/data/models/user-model';

export default class implements WSEvent<'READY'> {
  public on = 'READY' as const;

  public async invoke(client: Socket, { token }: WS.Params.Ready) {
    const user = await User.findById(await app.users.verifyToken(token));

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
}
