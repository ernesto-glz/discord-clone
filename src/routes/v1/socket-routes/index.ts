import { Server } from 'socket.io';
import { socketAuth } from 'middlewares/socketAuth';
import { UserService } from 'services/user.service';
import { Room } from 'interfaces/Room';

const io = new Server();

io.use(socketAuth).on('connection', async (socket) => {
  const clients = io.sockets;
  const me = socket.data.user;
  const userRooms = socket.data.channels;
  const friends = socket.data.friends;

  io.to(socket.id).emit('READY');
  await UserService.setUserStatus(me._id, 'ONLINE');

  const joinAllChannels = () => {
    if (userRooms?.length) {
      userRooms.forEach((room: Room) => {
        socket.join(room._id);
      });
    }
  };

  joinAllChannels();

  const findFriendAndEmit = (
    action: 'FRIEND_CONNECTED' | 'FRIEND_DISCONNECTED'
  ) => {
    friends.forEach((friend: any) => {
      const friendId = friend._id;
      clients.sockets.forEach((socketData) => {
        const socketId = socketData.data.user._id;
        if (socketId === friendId) {
          socket.to(socketData.id).emit(action, me._id);
          socketData.to(socket.id).emit(action, friendId);
        }
      });
    });
  };

  findFriendAndEmit('FRIEND_CONNECTED');

  socket.on('NEW_FR', (request) => {
    clients.sockets.forEach((socketData) => {
      if (socketData.data.user._id === request.from._id) {
        io.to(socketData.id).emit('NEW_FR', request, 'OUTGOING');
      }
      if (socketData.data.user._id === request.to._id) {
        io.to(socketData.id).emit('NEW_FR', request, 'INCOMING');
      }
    });
  });

  socket.on('DENIED_FR', (request) => {
    clients.sockets.forEach((socketData) => {
      if (socketData.data.user._id === request.from) {
        io.to(socketData.id).emit('DENIED_FR', request, 'OUTGOING');
      }
      if (socketData.data.user._id === request.to) {
        io.to(socketData.id).emit('DENIED_FR', request, 'INCOMING');
      }
    });
  });

  socket.on('ACCEPTED_FR', async (request: any) => {
    const initData = { requestId: request._id };
    clients.sockets.forEach(({ data: socketData, id: socketId }) => {
      if (socketData.user._id === request.from._id) {
        socketData.friends.push(request.to);
        const finalData = { ...initData, user: request.to, type: 'OUTGOING' };
        io.to(socketId).emit('NEW_FRIEND', finalData);
      } else if (socketData.user._id === request.to._id) {
        socketData.friends.push(request.from);
        const finalData = { ...initData, user: request.from, type: 'INCOMING' };
        io.to(socketId).emit('NEW_FRIEND', finalData);
      }
    });
  });

  socket.on('NEW_DM_CHAT', (channel) => {
    userRooms.push(channel);
    clients.sockets.forEach((socketData) => {
      const socketUserId = socketData.data.user._id;
      if (socketUserId === channel.sender) {
        io.to(socketData.id).emit('NEW_DM_CHAT');
        socketData.join(channel._id);
      }
      if (socketUserId === channel.receiver) {
        io.to(socketData.id).emit('NEW_DM_CHAT');
        socketData.join(channel._id);
      }
    });
  });

  socket.on('MESSAGE_CREATE', (data) => {
    io.to(data.roomId).emit('MESSAGE_CREATE', data, data.roomId);
  });

  socket.on('disconnect', async () => {
    try {
      await UserService.setUserStatus(me._id, 'OFFLINE');
      findFriendAndEmit('FRIEND_DISCONNECTED');
    } catch (error: any) {
      console.log(`[WS] - [disconnect] -> ${error?.message}`);
    }
  });
});

export default io;
