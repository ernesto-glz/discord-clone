import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';
import { UserDocument } from 'interfaces/User';

export default class implements WSEvent<'FRIEND_REQUEST_ACCEPT'> {
  public on = 'FRIEND_REQUEST_ACCEPT' as const;

  public async invoke(ws: WebSocket, client: Socket, { request, channel }: WS.Params.RequestAccept) {
    const { from, to } = request;
    const fromSocketId = ws.sessions.getClientIdFromUserId(request.from._id);

    app.rooms.joinGuildRooms(to as unknown as UserDocument, client);

    ws.io.sockets.sockets.forEach((s) => {
      if (s.id === fromSocketId) app.rooms.joinGuildRooms(from as unknown as UserDocument, s);
    });

    return [{
      emit: 'NEW_FRIEND' as const,
      to: [fromSocketId ?? ''],
      send: {
        requestId: request._id,
        channel,
        user: request.to,
      }
    }, {
      emit: 'NEW_FRIEND' as const,
      to: [client.id],
      send: {
        requestId: request._id,
        channel,
        user: request.from,
      }
    }];
  }
}
