import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_CREATE'> {
  public on = 'FRIEND_REQUEST_CREATE' as const;

  public async invoke(ws: WSGateway, client: Socket, { request }: WS.Params.RequestCreate) {
    const [fromInstances, toInstances] = app.sessions.getInstancesFromRequest(request);

    return [{
      emit: this.on,
      to: fromInstances,
      send: { request: { ...request, type: 'OUTGOING' } }
    }, {
      emit: this.on,
      to: toInstances,
      send: { request: { ...request, type: 'INCOMING' } }
    }];
  }
}
