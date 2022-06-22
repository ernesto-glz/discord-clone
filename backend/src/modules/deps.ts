import { ChannelRepository } from 'repositories/channel.repository';
import { FriendRepository } from 'repositories/friend.repository';
import { MessageRepository } from 'repositories/message.repository';
import { UserRepository } from 'repositories/user.repository';
import { Server } from '../rest/server';
import { WebSocket } from '../ws/websocket';

export interface Deps {
  rest: Server;
  webSocket: WebSocket;
  users: UserRepository;
  channels: ChannelRepository;
  friends: FriendRepository;
  messages: MessageRepository;
}

export const deps: Deps = {
  rest: new Server(),
  webSocket: new WebSocket(),
  users: new UserRepository(),
  channels: new ChannelRepository(),
  friends: new FriendRepository(),
  messages: new MessageRepository()
};

global['deps'] = deps;
