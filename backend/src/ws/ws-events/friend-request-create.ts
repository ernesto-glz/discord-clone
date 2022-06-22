import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_CREATE'> {
  public on = 'FRIEND_REQUEST_CREATE' as const;

  public async invoke(ws: WebSocket, client: Socket, params: any): Promise<any> {
    const fromId = ws.sessions.getClientIdFromUserId(params.request.from._id) ?? '';
    const toId = ws.sessions.getClientIdFromUserId(params.request.to._id) ?? '';

    return [
      {
        emit: this.on,
        to: fromId,
        send: { request: params.request, type: 'OUTGOING' }
      },
      {
        emit: this.on,
        to: toId,
        send: { request: params.request, type: 'INCOMING' }
      }
    ];
  }
}
