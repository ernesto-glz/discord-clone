import React from 'react';
import { io } from 'socket.io-client';
import { getJwt } from 'src/utils/user';

interface Props {
  children: React.ReactNode;
}

const token = getJwt();
export const ws = io(
  `${process.env.REACT_APP_API_ROOT || 'http://localhost:4000'}`,
  {
    secure: true,
    path: '/websocket',
    auth: { token },
    autoConnect: false
  }
);
ws.io.on('open', () => console.log('Connected to WS Server'));
