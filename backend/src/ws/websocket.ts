import { WS } from '@dclone/types';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Server, Socket } from 'socket.io';
import { WSAction, WSEvent } from './ws-events/ws-event';
import { WebSocketServer, WebSocketGateway, OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { isArray } from 'class-validator';

@WebSocketGateway(+process.env.PORT + 1, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  path: '/websocket',
  serveClient: false
})
export class WSGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() io: Server;
  public sessions = app.sessions;
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

    global['ws'] = this;
  }

  handleConnection(client: Socket) {
    for (const event of this.events.values()) {
      client.on(event.on, async (data: any) => {
        try {
          const actions = await event.invoke.call(event, client, data);
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
    const socketIds = action.to;
    if (!isArray(socketIds))
      return this.io.to(socketIds ?? '').emit(action.emit, action.send);

    const to = socketIds.length ? socketIds : [''];
    return this.io.to(to).emit(action.emit, action.send);
  }
}
