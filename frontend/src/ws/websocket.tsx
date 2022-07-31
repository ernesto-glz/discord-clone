import { io } from 'socket.io-client';

const WS_SERVER_ROOT = import.meta.env.VITE_WS_ROOT;

export const ws = io(
  `${WS_SERVER_ROOT ?? 'http://localhost:4001'}`,
  {
    secure: true,
    path: '/websocket',
    transports: ['websocket', 'polling', 'flashsocket']
  }
);
export const resetWS = () => {
  ws.disconnect();
  setTimeout(() => ws.connect(), 200);
};

ws.io.on('open', () => console.log('Connected to WS Server'));
