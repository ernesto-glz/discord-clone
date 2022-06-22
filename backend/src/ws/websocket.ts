import { socketAuth } from './modules/socketAuth';
import { UserService } from 'services/user.service';
import { Server as SocketServer } from 'socket.io';
import { User } from 'interfaces/User';
import { SessionManager } from './modules/session-manager';
import { join } from 'path';
import { readdirSync } from 'fs';
import { WS } from '@discord/types';
import { WSAction, WSEvent } from './ws-events/ws-event';

export class WebSocket {
  public io: SocketServer;
  public sessions = new SessionManager();
  public events = new Map<keyof WS.To, WSEvent<keyof WS.To>>();

  public get connectedUserIds() {
    return Array.from(this.sessions.values());
  }

  public constructor() {
    this.io = this.io = new SocketServer({
      cors: { origin: '*', methods: ['GET', 'POST'] },
      path: '/websocket',
      serveClient: false
    });
    this.io.use(socketAuth);

    const dir = join(`${__dirname}/ws-events`);
    const files = readdirSync(dir);

    for (const file of files) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Event = require(`./ws-events/${file}`).default;
      try {
        const event = new Event();
        this.events.set(event.on, event);
        // eslint-disable-next-line no-empty
      } catch {}
    }

    this.io.on('connection', async (client) => {
      const clients = this.io.sockets;
      const me: User = client.data.user;

      for (const event of this.events.values())
        client.on(event.on, async (data: any) => {
          try {
            const actions = await event.invoke.call(event, this, client, data);
            for (const action of actions) if (action) this.handle(action);
          } catch (error: any) {
            client.emit('error', { message: error.message });
          }
        });

      client.join(me.guildIds);

      await UserService.setUserStatus(me._id, 'ONLINE');
      client.to(me.guildIds).emit('PRESENCE_UPDATE', {
        userId: me._id,
        status: 'ONLINE'
      });

      client.on('NEW_FRIEND_REQUEST', (request) => {
        clients.sockets.forEach((socketData) => {
          if (socketData.data.user._id === request.from._id) {
            this.io.to(socketData.id).emit('NEW_FRIEND_REQUEST', request, 'OUTGOING');
          }
          if (socketData.data.user._id === request.to._id) {
            this.io.to(socketData.id).emit('NEW_FRIEND_REQUEST', request, 'INCOMING');
          }
        });
      });

      client.on('DENIED_FR', (request) => {
        clients.sockets.forEach((socketData) => {
          if (socketData.data.user._id === request.from) {
            this.io.to(socketData.id).emit('DENIED_FR', request, 'OUTGOING');
          }
          if (socketData.data.user._id === request.to) {
            this.io.to(socketData.id).emit('DENIED_FR', request, 'INCOMING');
          }
        });
      });

      client.on('ACCEPTED_FR', async ({ request, channel }) => {
        const initData = { requestId: request._id, channel };

        clients.sockets.forEach((ws) => {
          if (ws.data.user._id === request.from._id) {
            ws.data.friends.push(request.to);
            const finalData = {
              ...initData,
              user: request.to,
              type: 'OUTGOING'
            };
            ws.join(channel.guildId);
            this.io.to(ws.id).emit('NEW_FRIEND', finalData);
          } else if (ws.data.user._id === request.to._id) {
            ws.data.friends.push(request.from);
            const finalData = {
              ...initData,
              user: request.from,
              type: 'INCOMING'
            };
            ws.join(channel.guildId);
            this.io.to(ws.id).emit('NEW_FRIEND', finalData);
          }
        });
      });

      client.on('HIDE_CHANNEL', async ({ userId, channelId }) => {
        clients.sockets.forEach((ws) => {
          if (ws.data.user._id === userId)
            this.io.to(ws.id).emit('HIDE_CHANNEL', channelId);
        });
        UserService.setInHiddenDMS(userId, channelId);
      });

      client.on('DISPLAY_CHANNEL', async ({ channel, userId }) => {
        clients.sockets.forEach((ws) => {
          const socketUserId = ws.data.user._id;
          if (socketUserId === userId) {
            this.io.to(ws.id).emit('DISPLAY_CHANNEL', channel._id);
          }
        });
        UserService.deleteFromHiddenDMS(channel._id, userId);
      });

      client.on('MESSAGE_CREATE', (data) => {
        this.io.to(data.guildId).emit('MESSAGE_CREATE', data, data.channelId);
      });
    });
  }

  public handle(action: WSAction<keyof WS.From>) {
    this.io.to(action.to).emit(action.emit, action.send);
  }

  public to(...rooms: string[]) {
    return this.io.to(rooms) as {
      emit: <K extends keyof WS.From>(name: K, args: WS.From[K]) => any;
    };
  }
}
