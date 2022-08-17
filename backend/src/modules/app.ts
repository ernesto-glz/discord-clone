import Channels from 'src/data/channels';
import Requests from 'src/data/requests';
import Users from 'src/data/users';
import { SessionManager } from 'src/ws/modules/session-manager';
import { WSRooms } from 'src/ws/modules/ws-rooms';

export interface App {
  users: Users;
  channels: Channels;
  requests: Requests;
  rooms: WSRooms;
  sessions: SessionManager;
}

const app = {
  users: new Users(),
  channels: new Channels(),
  requests: new Requests(),
  rooms: new WSRooms(),
  sessions: new SessionManager()
} as App;

global['app'] = app;
