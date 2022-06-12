import React, { useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppSelector } from 'src/redux/hooks';
import { selectUsername } from 'src/redux/states/user';
import { getJwt } from 'src/utils/user';

const token = getJwt();
export const ws = io(
  `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}`,
  {
    secure: true,
    query: { token },
    autoConnect: false
  }
);
const SocketContext = React.createContext(ws);

export const useWS = () => useContext(SocketContext);

type Props = { children: React.ReactNode };

export const WSProvider: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useAppSelector(selectUsername);

  useEffect(() => {
    if (isLoggedIn && !ws.connected) {
      ws.connect();
    }

    if (!isLoggedIn && ws.connected) {
      ws.disconnect();
    }
  }, [isLoggedIn]);

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>;
};
