import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { getJwt } from 'src/utils/user';
import { UserState } from '../models/user.model';

const token = getJwt();
export const socket = io(
  `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}`,
  {
    query: { token },
    autoConnect: false
  }
);
const SocketContext = React.createContext(socket);

export const useSocket = () => useContext(SocketContext);

type Props = { children: React.ReactNode };

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: UserState) => state.user.username);

  useEffect(() => {
    if (user && !socket.connected) {
      socket.connect();
    }

    if (!user && socket.connected) {
      socket.disconnect();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
