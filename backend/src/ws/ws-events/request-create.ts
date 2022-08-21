import { Socket } from 'socket.io';
import { WS } from '@dclone/types';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_CREATE'> {
  public on = 'FRIEND_REQUEST_CREATE' as const;

  public async invoke(client: Socket, { request }: WS.Params.RequestCreate) {
    const [senderSessions, receiverSessions] = app.sessions.getSessionsFromRequest(request);

    return [{
      emit: this.on,
      to: senderSessions,
      send: { request: { ...request, type: 'OUTGOING' } }
    }, {
      emit: this.on,
      to: receiverSessions,
      send: { request: { ...request, type: 'INCOMING' } }
    }];
  }
}
