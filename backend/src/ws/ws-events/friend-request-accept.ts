import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_ACCEPT'> {
  public on = 'FRIEND_REQUEST_ACCEPT' as const;

  public async invoke(ws: WebSocket, client: Socket, { request, channel }: WS.Params.RequestAccept) {
    const fromId = ws.sessions.getClientIdFromUserId(request.from._id);
    const toId = ws.sessions.getClientIdFromUserId(request.to._id);

    ws.io.sockets.sockets.forEach((s) => {
      if (s.data.user._id === request.from._id) s.join(channel.guildId);
      else if (s.data.user._id === request.to._id) s.join(channel.guildId);
    });

    return [
      {
        emit: 'NEW_FRIEND' as const,
        to: [fromId ?? ''],
        send: {
          requestId: request._id,
          channel,
          user: request.to,
          type: 'OUTGOING'
        }
      },
      {
        emit: 'NEW_FRIEND' as const,
        to: [toId ?? ''],
        send: {
          requestId: request._id,
          channel,
          user: request.from,
          type: 'INCOMING'
        }
      }
    ];
  }
}
