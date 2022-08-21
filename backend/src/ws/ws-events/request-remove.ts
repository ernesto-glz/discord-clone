import { Socket } from 'socket.io';
import { WS } from '@dclone/types';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'FRIEND_REQUEST_REMOVE'> {
  public on = 'FRIEND_REQUEST_REMOVE' as const;

  public async invoke(client: Socket, { request }: WS.Params.RequestRemove) {
    const [senderSessions, receiverSessions] = app.sessions.getSessionsFromRequest(request);

    return [{
      emit: this.on,
      to: senderSessions,
      send: { requestId: request.id }
    }, {
      emit: this.on,
      to: receiverSessions,
      send: { requestId: request.id }
    }];
  }
}
