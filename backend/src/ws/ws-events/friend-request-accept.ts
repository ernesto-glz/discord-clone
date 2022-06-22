import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_ACCEPT'> {
  public on = 'FRIEND_REQUEST_ACCEPT' as const;

  public async invoke(ws: WebSocket, client: Socket, params: any): Promise<any> {
    const fromId = ws.sessions.getClientIdFromUserId(params.request.from._id) ?? '';
    const toId = ws.sessions.getClientIdFromUserId(params.request.to._id) ?? '';

    ws.io.sockets.sockets.forEach((s) => {
      if (s.data.user._id === params.request.from._id) s.join(params.channel.guildId);
      else if (s.data.user._id === params.request.to._id) s.join(params.channel.guildId);
    });

    return [
      {
        emit: 'NEW_FRIEND' as const,
        to: fromId,
        send: {
          requestId: params.request._id,
          channel: params.channel,
          user: params.request.to,
          type: 'OUTGOING'
        }
      },
      {
        emit: 'NEW_FRIEND' as const,
        to: toId,
        send: {
          requestId: params.request._id,
          channel: params.channel,
          user: params.request.from,
          type: 'INCOMING'
        }
      }
    ];
  }
}
