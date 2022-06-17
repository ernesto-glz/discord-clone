import { Channel } from 'interfaces/Channel';
import { Server as HttpServer } from 'http';
import { socketAuth } from './modules/socketAuth';
import { UserService } from 'services/user.service';
import { Server as SocketServer } from 'socket.io';
import { User } from 'interfaces/User';

export class WebSocket {
  public io: SocketServer;

  public get connectedUsers() {
    return this.io.sockets;
  }

  public constructor(server: HttpServer) {
    this.io = this.io = new SocketServer(server, {
      cors: { origin: '*' }
    });
    this.io.use(socketAuth);

    this.io.on('connection', async (client) => {
      const clients = this.io.sockets;
      const me: User = client.data.user;

      this.io.to(client.id).emit('READY');

      client.join(me.guildIds);

      await UserService.setUserStatus(me._id, 'ONLINE');
      client.broadcast.emit('PRESENCE_UPDATE', {
        userId: me._id,
        status: 'ONLINE'
      });

      client.on('NEW_FR', (request) => {
        clients.sockets.forEach((socketData) => {
          if (socketData.data.user._id === request.from._id) {
            this.io.to(socketData.id).emit('NEW_FR', request, 'OUTGOING');
          }
          if (socketData.data.user._id === request.to._id) {
            this.io.to(socketData.id).emit('NEW_FR', request, 'INCOMING');
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

      // client.on('CHANNEL_CREATE', (channel) => {
      //   clients.sockets.forEach((socketData) => {
      //     const socketUserId = socketData.data.user._id;
      //     if (
      //       socketUserId === channel.userIds[0]._id ||
      //       socketUserId === channel.userIds[1]._id
      //     ) {
      //       socketData.join(channel.guildId);
      //     }
      //   });
      //   this.io.to(channel.guildId).emit('CHANNEL_CREATE', { channel });
      // });

      client.on('DISPLAY_CHANNEL', async ({ channel, userId }) => {
        await UserService.deleteFromHiddenDMS(channel._id, userId);
        clients.sockets.forEach((ws) => {
          const socketUserId = ws.data.user._id;
          if (socketUserId === userId) {
            this.io.to(ws.id).emit('DISPLAY_CHANNEL', channel._id);
          }
        });
      });

      client.on('MESSAGE_CREATE', (data) => {
        this.io.to(data.guildId).emit('MESSAGE_CREATE', data, data.channelId);
      });

      client.on('disconnect', async () => {
        try {
          await UserService.setUserStatus(me._id, 'OFFLINE');
          client.broadcast.emit('PRESENCE_UPDATE', {
            userId: me._id,
            status: 'OFFLINE'
          });
        } catch (error: any) {
          console.log(`[WS] - [disconnect] -> ${error?.message}`);
        }
      });
    });
  }
}
