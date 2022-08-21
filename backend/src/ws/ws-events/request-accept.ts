import { WS } from '@dclone/types';
import { Socket } from 'socket.io';
import { WSEvent } from './ws-event';
import { User } from 'src/data/models/user-model';

export default class implements WSEvent<'FRIEND_REQUEST_ACCEPT'> {
  public on = 'FRIEND_REQUEST_ACCEPT' as const;

  public async invoke(client: Socket, { request, friendId, channel }: WS.Params.RequestAccept) {
    const selfId = ws.sessions.userId(client);
    const [senderSessions, receiverSessions] = app.sessions.getSessionsFromRequest(request);
    
    this.joinRooms({ channel, sessions: [...senderSessions, ...receiverSessions] });

    return [{
      emit: 'FRIEND_ADDED' as const,
      to: senderSessions,
      send: {
        requestId: request.id,
        channel: await app.channels.fillInfo(channel, friendId),
        user: await User.findById(selfId),
      }
    }, {
      emit: 'FRIEND_ADDED' as const,
      to: receiverSessions,
      send: {
        requestId: request.id,
        channel: await app.channels.fillInfo(channel, selfId),
        user: await User.findById(friendId),
      }
    }];
  }

  private async joinRooms({ channel, sessions }: JoinRooms) {
    const sockets = await ws.io.fetchSockets();
    for (const socket of sockets) {
      if (sessions.includes(socket.id))
        app.rooms.joinDM(channel, socket);
    }
  }
}

interface JoinRooms {
  channel: any;
  sessions: string[];
}