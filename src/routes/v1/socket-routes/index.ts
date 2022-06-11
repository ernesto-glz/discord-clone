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

  if (userRooms?.length) {
    userRooms.forEach((room) => {
      socket.join(room._id.toString());
    });
  }

  const friends = await FriendService.getFriends(me._id, false);

  const findFriendAndEmit = (
    action: 'friend-connected' | 'friend-disconnected'
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

  socket.on('get-friends-status', () => {
    findFriendAndEmit('friend-connected');
  });

  socket.on('notify-new-fr', (username: string) => {
    clients.sockets.forEach((data) => {
      if (data.handshake.auth.username === username && data.connected) {
        io.to(data.id).emit('notify-new-fr');
      }
    });
  });

  socket.on('notify-update-fr', (username: string) => {
    clients.sockets.forEach((data) => {
      if (data.handshake.auth.username === username && data.connected) {
        io.to(data.id).emit('notify-update-fr');
      }
    });
  });

  socket.on('notify-dm-chat', (room) => {
    clients.sockets.forEach((data) => {
      if (
        data.handshake.auth._id.toString() === room.sender.toString() &&
        data.connected
      ) {
        io.to(data.id).emit('notify-dm-chat');
      }
      if (
        data.handshake.auth._id.toString() === room.receiver.toString() &&
        data.connected
      ) {
        io.to(data.id).emit('notify-dm-chat');
      }
    });
  });

  socket.on('new-room', (userId, room) => {
    clients.sockets.forEach((data) => {
      if (
        data.handshake.auth._id.toString() === userId.toString() &&
        data.connected
      ) {
        data.join(room.toString());
      }
    });
  });

  socket.on('message', (data) => {
    io.to(data.roomId).emit('message', data);
  });

  socket.on('disconnect', () => {
    findFriendAndEmit('friend-disconnected');
  });
});

export default io;
