import { io } from 'socket.io-client';

export const ws = io(
  `${process.env.REACT_APP_API_ROOT || 'http://localhost:4000'}`,
  {
    secure: true,
    path: '/websocket',
    transports: ['websocket', 'polling', 'flashsocket'],
  }
);
export const resetWS = () => {
  ws.disconnect();
  setTimeout(() => ws.connect(), 200);
};

ws.io.on('open', () => console.log('Connected to WS Server'));
