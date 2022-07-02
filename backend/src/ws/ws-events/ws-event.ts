import { WS } from '@discord/types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';

export interface WSEvent<T extends keyof WS.To> {
  on: T;
  invoke: (ws: WebSocket, client: Socket, params: WS.To[T]) => Promise<(WSAction<keyof WS.From> | undefined)[]>;
}

export interface WSAction<T extends keyof WS.From> {
  emit: T;
  to: string[];
  send: WS.From[T];
}
