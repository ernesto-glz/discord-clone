import { WS } from '@dclone/types';
import { Socket } from 'socket.io';
import { User } from 'src/data/models/user-model';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REMOVE'> {
  public on = 'FRIEND_REMOVE' as const;

  public async invoke(client: Socket, { userId, token }: WS.Params.FriendRemove) {
    const selfId = await app.users.verifyToken(token);
    const selfSessions = app.sessions.getSessions(selfId);
    const userSessions = app.sessions.getSessions(userId);

    await this.removeFriend(selfId, userId);
    await this.removeFriend(userId, selfId);

    return [{
      emit: this.on,
      to: selfSessions,
      send: { userId }
    }, {
      emit: this.on,
      to: userSessions,
      send: { userId: selfId }
    }]
  }

  private async removeFriend(userId: string, target: string) {
    return await User.updateOne({ _id: userId }, { $pull: { friendIds: target } });
  }
}
