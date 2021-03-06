import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_REMOVE'> {
  public on = 'FRIEND_REQUEST_REMOVE' as const;

  public async invoke(ws: WSGateway, client: Socket, { request }: WS.Params.RequestRemove) {
    const [fromInstances, toInstances] = app.sessions.getInstancesFromRequest(request);

    return [{
      emit: this.on,
      to: fromInstances ?? [''],
      send: { requestId: request.id }
    }, {
      emit: this.on,
      to: toInstances ?? [''],
      send: { requestId: request.id }
    }];
  }
}
