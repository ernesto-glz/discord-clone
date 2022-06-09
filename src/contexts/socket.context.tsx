import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { selectToken } from 'src/redux/states/user';
import { getJwt } from 'src/utils/user';

const token = getJwt();
export const socket = io(
  `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}`,
  {
    secure: true,
    query: { token },
    autoConnect: false
  }
);
const SocketContext = React.createContext(socket);

export const useSocket = () => useContext(SocketContext);

type Props = { children: React.ReactNode };

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useSelector(selectToken);

  useEffect(() => {
    if (isLoggedIn && !socket.connected) {
      socket.connect();
    }

    if (!isLoggedIn && socket.connected) {
      socket.disconnect();
    }
  }, [isLoggedIn]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
