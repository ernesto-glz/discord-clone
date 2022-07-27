import { Socket } from 'socket.io';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';
import { WS } from '@discord/types';
import { User } from 'src/data/models/user-model';

export default class implements WSEvent<'USER_UPDATE'> {
  public on = 'USER_UPDATE' as const;

  public async invoke(ws: WSGateway, client: Socket, { userId, partialUser }: WS.Params.UserUpdate) {
    const user = await User.findById(userId);

    if (!user)
      throw new TypeError('User not found');

    return [{
      emit: this.on,
      to: user.guildIds,
      send: { userId, partialUser }
    }];
  }
}
