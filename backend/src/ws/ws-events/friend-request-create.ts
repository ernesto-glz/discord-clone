import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_CREATE'> {
  public on = 'FRIEND_REQUEST_CREATE' as const;

  public async invoke(ws: WebSocket, client: Socket, { request }: WS.Params.RequestCreate) {
    const fromId = ws.sessions.getClientIdFromUserId(request.from._id);
    const toId = ws.sessions.getClientIdFromUserId(request.to._id);

    return [
      {
        emit: this.on,
        to: [fromId ?? ''],
        send: { request, type: 'OUTGOING' }
      },
      {
        emit: this.on,
        to: [toId ?? ''],
        send: { request, type: 'INCOMING' }
      }
    ];
  }
}
