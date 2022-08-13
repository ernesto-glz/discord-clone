import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';
import { User } from 'src/data/models/user-model';

export default class implements WSEvent<'FRIEND_REQUEST_ACCEPT'> {
  public on = 'FRIEND_REQUEST_ACCEPT' as const;

  public async invoke(ws: WSGateway, client: Socket, { request, friendId, channel }: WS.Params.RequestAccept) {
    const selfId = ws.sessions.userId(client);
    const [senderSessions, receiverSessions] = app.sessions.getSessionsFromRequest(request);
    
    this.joinRooms(ws, client, { channel, from: senderSessions });

    return [{
      emit: 'NEW_FRIEND' as const,
      to: senderSessions,
      send: {
        requestId: request.id,
        channel: await app.channels.fillInfo(channel, friendId),
        user: await User.findById(selfId),
      }
    }, {
      emit: 'NEW_FRIEND' as const,
      to: receiverSessions,
      send: {
        requestId: request.id,
        channel: await app.channels.fillInfo(channel, selfId),
        user: await User.findById(friendId),
      }
    }];
  }

  private joinRooms(ws: WSGateway, client: Socket, { channel, from }: { channel: any, from: string[] }) {
    client.join(channel.id);
    client.join(channel.guildId);

    if (!from) return;

    ws.io.sockets.sockets.forEach((s) => {
      if (from.includes(s.id)) {
        s.join(channel.id);
        s.join(channel.guildId);
      }
    });
  }
}
