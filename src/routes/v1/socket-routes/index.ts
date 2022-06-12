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

  socket.on('NEW_FR', (username: string) => {
    clients.sockets.forEach((data) => {
      if (data.handshake.auth.username === username) {
        io.to(data.id).emit('NEW_FR');
      }
    });
  });

  socket.on('DENIED_FR', (userId: string) => {
    clients.sockets.forEach((data) => {
      if (data.handshake.auth._id === userId) {
        io.to(data.id).emit('UPDATE_FR');
      }
    });
  });

  socket.on('ACCEPTED_FR', async (request: any) => {
    try {
      const fromId = request.from._id.toString();
      const toId = request.to._id.toString();
      clients.sockets.forEach((socketData) => {
        if (socketData.handshake.auth._id.toString() === fromId) {
          io.to(socketData.id).emit('UPDATE_FR');
          io.to(socketData.id).emit('NEW_FRIEND', request.to);
        }
        if (socketData.handshake.auth._id.toString() === toId) {
          io.to(socketData.id).emit('UPDATE_FR');
          io.to(socketData.id).emit('NEW_FRIEND', request.from);
        }
      });
    } catch (error: any) {
      console.log(error?.message || error);
    }
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
