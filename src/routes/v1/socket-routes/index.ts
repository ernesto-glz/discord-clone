import { Server } from 'socket.io';
import { socketAuth } from 'middlewares/socketAuth';
import { RoomService } from 'services/room.service';
import { FriendService } from 'services/friend.service';

const io = new Server();

io.use(socketAuth).on('connection', async (socket) => {
  const clients = io.sockets;
  const me = socket.handshake.auth;

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
        const friendId = friend.userId.toString();
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
      if (data.handshake.auth.username === username && data.connected) {
        io.to(data.id).emit('NEW_FR');
      }
    });
  });

  socket.on('UPDATE_FR', (username: string) => {
    clients.sockets.forEach((data) => {
      if (data.handshake.auth.username === username && data.connected) {
        io.to(data.id).emit('UPDATE_FR');
      }
    });
  });

  socket.on('NEW_DM_CHAT', (room) => {
    userRooms.push(room);
    clients.sockets.forEach((socketData) => {
      const socketUserId = socketData.handshake.auth._id.toString();
      if (socketUserId === room.sender.toString()) {
        io.to(socketData.id).emit('NEW_DM_CHAT');
        socketData.join(room._id.toString());
      }
      if (socketUserId === room.receiver.toString()) {
        io.to(socketData.id).emit('NEW_DM_CHAT');
        socketData.join(room._id.toString());
      }
    });
  });

  socket.on('MESSAGE_CREATE', (data) => {
    io.to(data.roomId).emit('MESSAGE_CREATE', data, data.roomId);
  });

  socket.on('disconnect', () => {
    findFriendAndEmit('FRIEND_DISCONNECTED');
  });
});

export default io;
