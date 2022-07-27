import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_REMOVE'> {
  public on = 'FRIEND_REQUEST_REMOVE' as const;

  public async invoke(ws: WSGateway, client: Socket, { requestId, notify }: WS.Params.RequestRemove) {
    const socketId = ws.sessions.getClientIdFromUserId(notify);

    return [{
      emit: this.on,
      to: [socketId ?? ''],
      send: { requestId }
    }];
  }
}
