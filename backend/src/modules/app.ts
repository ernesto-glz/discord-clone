import { ChannelRepository } from 'repositories/channel-repository';
import { FriendRepository } from 'repositories/friend-repository';
import { MessageRepository } from 'repositories/message-repository';
import { UserRepository } from 'repositories/user-repository';
import { WSRooms } from '../ws/modules/ws-rooms';
import { Server } from '../api/server';
import { WebSocket } from '../ws/websocket';

export interface App {
  rest: Server;
  webSocket: WebSocket;
  users: UserRepository;
  channels: ChannelRepository;
  friends: FriendRepository;
  messages: MessageRepository;
  rooms: WSRooms;
}

export const app: App = {
  rest: new Server(),
  webSocket: new WebSocket(),
  users: new UserRepository(),
  channels: new ChannelRepository(),
  friends: new FriendRepository(),
  messages: new MessageRepository(),
  rooms: new WSRooms()
};

global['app'] = app;
