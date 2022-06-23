import { WS } from '@discord/types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';

export interface WSEvent<T extends keyof WS.Events> {
  on: T;
  invoke: (ws: WebSocket, client: Socket, params: WS.Events[T]) => Promise<(WSAction<keyof WS.Events> | undefined)[]>;
}

export interface WSAction<T extends keyof WS.Events> {
  emit: T;
  to: string[];
  send: WS.Events[T];
}
