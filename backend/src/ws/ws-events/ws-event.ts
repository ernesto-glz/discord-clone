import { WS } from '@discord/types';
import { Socket } from 'socket.io';

export interface WSEvent<T extends keyof WS.To> {
  on: T;
  invoke: (client: Socket, params: WS.To[T]) => Promise<(WSAction<keyof WS.From> | undefined)[]>;
}

export interface WSAction<T extends keyof WS.From> {
  emit: T;
  to: string[];
  send: WS.From[T];
}
