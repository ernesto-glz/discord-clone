import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'READY'> {
  public on = 'READY' as const;

  public async invoke(ws: WebSocket, client: Socket): Promise<any> {
    return [
      {
        emit: 'READY' as const,
        to: client.id,
        send: {}
      }
    ];
  }
}
