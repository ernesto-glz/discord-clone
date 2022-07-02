import { WSGuard } from './modules/ws-guard';
import { Server as SocketServer } from 'socket.io';
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
    this.io.use(WSGuard);

    const dir = join(`${__dirname}/ws-events`);
    const files = readdirSync(dir);

    for (const file of files) {
      const Event = require(`./ws-events/${file}`).default;
      try {
        const event = new Event();
        this.events.set(event.on, event);
      } catch {}
    }

    this.io.on('connection', async (client) => {
      for (const event of this.events.values())
        client.on(event.on, async (data: any) => {
          try {
            const actions = await event.invoke.call(event, this, client, data);
            for (const action of actions) if (action) this.handle(action);
          } catch (error: any) {
            client.emit('error', { message: error.message });
          }
        });
    });
  }

  public handle(action: WSAction<keyof WS.From>) {
    this.io.to(action.to).emit(action.emit, action.send);
  }

  public to(...rooms: string[]) {
    return this.io.to(rooms) as {
      emit: <T extends keyof WS.From>(name: T, args: WS.From[T]) => any;
    };
  }
}
