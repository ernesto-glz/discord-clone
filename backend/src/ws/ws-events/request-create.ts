import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_CREATE'> {
  public on = 'FRIEND_REQUEST_CREATE' as const;

  public async invoke(ws: WebSocket, client: Socket, { request }: WS.Params.RequestCreate) {
    const toSocketId = ws.sessions.getClientIdFromUserId(request.to.id);

    return [{
      emit: this.on,
      to: [client.id],
      send: { request: { ...request, type: 'OUTGOING' } }
    }, {
      emit: this.on,
      to: [toSocketId ?? ''],
      send: { request: { ...request, type: 'INCOMING' } }
    }];
  }
}
