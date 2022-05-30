import { Server } from 'socket.io';
import { socketAuth } from 'middlewares/socketAuth';
import { RoomService } from 'services/room.service';

const io = new Server();

io.use(socketAuth).on('connection', async (socket) => {
  const clients = io.sockets;

  const userRooms = await RoomService.getAllRooms(
    socket.handshake.auth._id.toString(),
    false
  );

  if (userRooms?.length) {
    userRooms.forEach((room) => {
      socket.join(room._id.toString());
    });
  }

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
});

export default io;
