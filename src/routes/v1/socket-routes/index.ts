import { Server } from 'socket.io';
import { socketAuth } from 'middlewares/socketAuth';
import { RoomService } from 'services/room.service';
import { FriendService } from 'services/friend.service';
import { UserService } from 'services/user.service';

const io = new Server();

io.use(socketAuth).on('connection', async (socket) => {
  const clients = io.sockets;
  const me = socket.handshake.auth;

  await UserService.setUserStatus(me._id, 'ONLINE');

  const userRooms = await RoomService.getAllRooms(
    socket.handshake.auth._id.toString(),
    false
  );

  const joinAllChannels = () => {
    if (userRooms?.length) {
      userRooms.forEach((room) => {
        socket.join(room._id.toString());
      });
    }
  };

  joinAllChannels();
  const friends = await FriendService.getFriends(me._id, false);

  const findFriendAndEmit = (
    action: 'FRIEND_CONNECTED' | 'FRIEND_DISCONNECTED'
  ) => {
    if (friends?.length) {
      friends.forEach((friend: any) => {
        const friendId = friend._id.toString();
        clients.sockets.forEach((socketData) => {
          const socketId = socketData.handshake.auth._id.toString();
          if (socketId === friendId) {
            socket.to(socketData.id).emit(action, me._id);
            socketData.to(socket.id).emit(action, friendId);
          }
        });
      });
    }
  };

  socket.on('GET_FRIENDS_STATUS', () => {
    findFriendAndEmit('FRIEND_CONNECTED');
  });

  socket.on('NEW_FR', (request) => {
    clients.sockets.forEach((socketData) => {
      if (socketData.handshake.auth._id.toString() === request.from._id) {
        io.to(socketData.id).emit('NEW_FR', request, 'OUTGOING');
      }
      if (socketData.handshake.auth._id.toString() === request.to._id) {
        io.to(socketData.id).emit('NEW_FR', request, 'INCOMING');
      }
    });
  });

  socket.on('DENIED_FR', (request) => {
    clients.sockets.forEach((socketData) => {
      if (socketData.handshake.auth._id.toString() === request.from) {
        io.to(socketData.id).emit('DENIED_FR', request, 'OUTGOING');
      }
      if (socketData.handshake.auth._id.toString() === request.to) {
        io.to(socketData.id).emit('DENIED_FR', request, 'INCOMING');
      }
    });
  });

  socket.on('ACCEPTED_FR', async (request: any) => {
    const fromId = request.from._id.toString();
    const toId = request.to._id.toString();
    clients.sockets.forEach((socketData) => {
      if (socketData.handshake.auth._id.toString() === fromId) {
        io.to(socketData.id).emit(
          'NEW_FRIEND',
          request.to,
          request._id,
          'OUTGOING'
        );
      }
      if (socketData.handshake.auth._id.toString() === toId) {
        io.to(socketData.id).emit(
          'NEW_FRIEND',
          request.from,
          request._id,
          'INCOMING'
        );
      }
    });
  });

  socket.on('NEW_DM_CHAT', (channel) => {
    userRooms.push(channel);
    clients.sockets.forEach((socketData) => {
      const socketUserId = socketData.handshake.auth._id.toString();
      if (socketUserId === channel.sender.toString()) {
        io.to(socketData.id).emit('NEW_DM_CHAT');
        socketData.join(channel._id.toString());
      }
      if (socketUserId === channel.receiver.toString()) {
        io.to(socketData.id).emit('NEW_DM_CHAT');
        socketData.join(channel._id.toString());
      }
    });
  });

  socket.on('MESSAGE_CREATE', (data) => {
    io.to(data.roomId).emit('MESSAGE_CREATE', data, data.roomId);
  });

  socket.on('disconnect', async () => {
    await UserService.setUserStatus(me._id, 'OFFLINE');
    findFriendAndEmit('FRIEND_DISCONNECTED');
  });
});

export default io;
