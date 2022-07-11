import { ChannelsRepository } from 'data/repositories/channel-repository';
import { RequestsRepository } from 'data/repositories/request-repository';
import { MessagesRepository } from 'data/repositories/message-repository';
import { UsersRepository } from 'data/repositories/user-repository';
import { WSRooms } from '../ws/modules/ws-rooms';
import { Server } from '../api/server';
import { WebSocket } from '../ws/websocket';

export interface App {
  rest: Server;
  webSocket: WebSocket;
  users: UsersRepository;
  channels: ChannelsRepository;
  requests: RequestsRepository;
  messages: MessagesRepository;
  rooms: WSRooms;
}

export const app: App = {
  rest: new Server(),
  webSocket: new WebSocket(),
  users: new UsersRepository(),
  channels: new ChannelsRepository(),
  requests: new RequestsRepository(),
  messages: new MessagesRepository(),
  rooms: new WSRooms()
};

global['app'] = app;
