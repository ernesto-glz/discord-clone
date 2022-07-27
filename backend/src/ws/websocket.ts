import { WS } from '@discord/types';
import { WebSocketServer, WebSocketGateway, OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Server, Socket } from 'socket.io';
import { SessionManager } from './modules/session-manager';
import { WSAction, WSEvent } from './ws-events/ws-event';

@WebSocketGateway(+process.env.PORT + 1, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  path: '/websocket',
  serveClient: false
})
export class WSGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() io: Server;
  public sessions = new SessionManager();
  public events = new Map<keyof WS.To, WSEvent<keyof WS.To>>();

  afterInit() {
    const dir = join(`${__dirname}/ws-events`);
    const files = readdirSync(dir);
    for (const file of files) {
      if (file.includes('.d.') || file.includes('.map')) continue;
      const Event = require(`./ws-events/${file}`).default;

      try {
        const event = new Event();
        this.events.set(event.on, event);
      } catch {}
    }

    global['app']['sessions'] = this.sessions;
  }

  handleConnection(client: Socket) {
    for (const event of this.events.values()) {
      client.on(event.on, async (data: any) => {
        try {
          const actions = await event.invoke.call(event, this, client, data);
          for (const action of actions) {
            if (action) this.handle(action);
          }
        } catch (error: any) {
          this.io.to(client.id).emit('error', { message: error.message });
        }
      });
    }
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
