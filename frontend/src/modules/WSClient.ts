import { WS } from '@discord/types';
import { io, Socket } from 'socket.io-client';

export interface WSArgs {
  data?: object;
  event: keyof WS.To;
}

export class WSClient {
  public client: Socket;

  constructor() {
    this.client = io(`${globalEnv.WS_ROOT}`, {
      secure: true,
      path: '/websocket',
      transports: ['websocket', 'polling', 'flashsocket'],
    });
    this.client.io.on('open', () => console.log('[WS]: Connected to the server'));
  }

  public call({ data, event }: WSArgs) {
    const unsub = () => {
      this.client.off(event, wrapperCallback);
      this.client.off('error', errorCallback);
    };

    const wrapperCallback = (payload: any) => {
      unsub();
      // console.log(event, payload);
    };

    const errorCallback = (payload: any) => {
      unsub();
      console.log(event, payload);
    };

    this.client.on(event, wrapperCallback);
    this.client.on('error', errorCallback);

    this.client.emit(event, data);
  }
}

global['wsClient'] = new WSClient();
