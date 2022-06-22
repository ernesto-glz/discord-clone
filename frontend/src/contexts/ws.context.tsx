import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppSelector } from 'src/redux/hooks';
import { getJwt } from 'src/utils/user';

interface Props {
  children: React.ReactNode;
}

const token = getJwt();
export const ws = io(
  `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}`,
  {
    secure: true,
    path: '/websocket',
    auth: { token },
    autoConnect: false
  }
);
ws.io.on('open', () => console.log('Connected to WS Server'));

const WSContext = React.createContext(ws);

export const WSProvider: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useAppSelector((s) => s.user.username);

  useEffect(() => {
    if (isLoggedIn && !ws.connected) {
      ws.connect();
    }

    if (!isLoggedIn && ws.connected) {
      ws.disconnect();
    }
  }, [isLoggedIn]);

  return <WSContext.Provider value={ws}>{children}</WSContext.Provider>;
};
