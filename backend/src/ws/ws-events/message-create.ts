import { Socket } from 'socket.io';
import { WS } from '@discord/types';
import { WebSocket } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'MESSAGE_CREATE'> {
  public on = 'MESSAGE_CREATE' as const;

  public async invoke(ws: WebSocket, client: Socket, data: WS.Params.MessageCreate) {
    return [{
      emit: this.on,
      to: [data.channelId],
      send: { data }
    }];
  }
}
