import { Channel } from 'interfaces/Channel';
import { Server as HttpServer } from 'http';
import { socketAuth } from './modules/socketAuth';
import { UserService } from 'services/user.service';
import { Server as SocketServer } from 'socket.io';

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
      const me = client.data.user;
      const userChannels = client.data.channels;

      this.io.to(client.id).emit('READY');

      userChannels.forEach((channel: Channel) => {
        client.join(channel._id);
      });

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

      client.on('ACCEPTED_FR', async (request: any) => {
        const initData = { requestId: request._id };
        clients.sockets.forEach(({ data: socketData, id: socketId }) => {
          if (socketData.user._id === request.from._id) {
            socketData.friends.push(request.to);
            const finalData = {
              ...initData,
              user: request.to,
              type: 'OUTGOING'
            };
            this.io.to(socketId).emit('NEW_FRIEND', finalData);
          } else if (socketData.user._id === request.to._id) {
            socketData.friends.push(request.from);
            const finalData = {
              ...initData,
              user: request.from,
              type: 'INCOMING'
            };
            this.io.to(socketId).emit('NEW_FRIEND', finalData);
          }
        });
      });

      client.on('CHANNEL_CREATE', (channel) => {
        clients.sockets.forEach((socketData) => {
          const socketUserId = socketData.data.user._id;
          if (socketUserId === channel.userIds[0]._id) {
            socketData.join(channel._id);
            this.io.to(socketData.id).emit('CHANNEL_CREATE', { channel });
          } else if (socketUserId === channel.userIds[1]._id) {
            socketData.join(channel._id);
            this.io.to(socketData.id).emit('CHANNEL_CREATE', { channel });
          }
        });
      });

      client.on('CHANNEL_GO', ({ channel, userId }) => {
        clients.sockets.forEach((socketData) => {
          const socketUserId = socketData.data.user._id;
          if (socketUserId === userId) {
            this.io.to(socketData.id).emit('CHANNEL_GO', channel._id);
          }
        });
      });

      client.on('MESSAGE_CREATE', (data) => {
        this.io.to(data.channelId).emit('MESSAGE_CREATE', data, data.channelId);
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
