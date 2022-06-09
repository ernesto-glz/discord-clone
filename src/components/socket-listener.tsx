import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FriendService } from 'src/services/friend.service';
import { setNotifCount } from 'src/redux/states/notification';
import { useSocket } from 'src/contexts/socket.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { selectToken } from 'src/redux/states/user';

interface Props {
  children: React.ReactNode;
}

export const SocketListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectToken);
  const { callEndpoint } = useFetchAndLoad();
  const socket = useSocket();

  const fetchNotifications = async () => {
    if (isLoggedIn) {
      const { data } = await callEndpoint(FriendService.getPendingRequests());
      if (data?.length) {
        dispatch(setNotifCount(data.length));
      } else {
        dispatch(setNotifCount(0));
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('notify-new-fr', fetchNotifications);
      socket.on('notify-update-fr', fetchNotifications);
    }

    return () => {
      socket.off('notify-new-fr');
      socket.off('notify-update-fr');
    };
  }, [isLoggedIn]);

  return <>{children}</>;
};
