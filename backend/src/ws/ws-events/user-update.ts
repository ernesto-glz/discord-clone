import { Socket } from 'socket.io';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';
import { WS } from '@discord/types';
import { User } from 'src/data/models/user-model';
import { verify } from 'jsonwebtoken';

export default class implements WSEvent<'USER_UPDATE'> {
  public on = 'USER_UPDATE' as const;

  public async invoke(ws: WSGateway, client: Socket, { token, partialUser }: any) {
    const userId = this.getUserIdFromToken(token);
    const user = await User.findById(userId);

    if (!user)
      throw new TypeError('User not found');
    
    Object.assign(user, partialUser);
    await user.save();
    
    return [{
      emit: this.on,
      to: user.guildIds,
      send: { userId, partialUser } as WS.Args.UserUpdate
    }];
  }

  private getUserIdFromToken(jwt: string) {
    const decoded = verify(jwt, process.env.JWT_SECRET_KEY) as { id: string };
    return decoded.id;
  }
}
