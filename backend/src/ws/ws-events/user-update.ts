import { WS } from '@discord/types';
import { Socket } from 'socket.io';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'USER_UPDATE'> {
  public on = 'USER_UPDATE' as const;

  public async invoke(client: Socket, { token, partialUser }: any) {
    const userId = await app.users.verifyToken(token);
    const user = await app.users.getSelf(userId);
    
    Object.assign(user, partialUser);
    await user.save();
    
    return [{
      emit: this.on,
      to: user.guildIds,
      send: { userId, partialUser } as WS.Args.UserUpdate
    }];
  }
}
