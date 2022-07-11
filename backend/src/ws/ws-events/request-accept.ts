import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_ACCEPT'> {
  public on = 'FRIEND_REQUEST_ACCEPT' as const;

  public async invoke(ws: WebSocket, client: Socket, { requestId, friendId, channel }: WS.Params.RequestAccept) {
    const selfId = ws.sessions.userId(client);
    const fromSocketId = ws.sessions.getClientIdFromUserId(friendId);
    
    this.joinRooms(ws, client, { channel, from: fromSocketId });

    return [{
      emit: 'NEW_FRIEND' as const,
      to: [fromSocketId ?? ''],
      send: {
        requestId,
        channel: await app.channels.fillInfo(channel, friendId),
        user: await app.users.findById(selfId),
      }
    }, {
      emit: 'NEW_FRIEND' as const,
      to: [client.id],
      send: {
        requestId,
        channel: await app.channels.fillInfo(channel, selfId),
        user: await app.users.findById(friendId),
      }
    }];
  }

  private joinRooms(ws: WebSocket, client: Socket, { channel, from }) {
    client.join(channel.id);
    client.join(channel.guildId);

    ws.io.sockets.sockets.forEach((s) => {
      if (s.id === from) {
        s.join(channel.id);
        s.join(channel.guildId);
      }
    });
  }
}
