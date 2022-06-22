import { UserRepository } from 'repositories/user.repository';
import { Server } from '../rest/server';
import { WebSocket } from '../ws/websocket';

export interface Deps {
  rest: Server;
  webSocket: WebSocket;
  users: UserRepository;
}

export const deps: Deps = {
  rest: new Server(),
  webSocket: new WebSocket(),
  users: new UserRepository()
};

global['deps'] = deps;
