import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_REMOVE'> {
  public on = 'FRIEND_REQUEST_REMOVE' as const;

  public async invoke(ws: WSGateway, client: Socket, { request }: WS.Params.RequestRemove) {
    const fromId = ws.sessions.getClientIdFromUserId(request.from.id);
    const toId = ws.sessions.getClientIdFromUserId(request.to.id);

    return [{
      emit: this.on,
      to: [fromId ?? ''],
      send: { requestId: request.id }
    }, {
      emit: this.on,
      to: [toId ?? ''],
      send: { requestId: request.id }
    }];
  }
}
