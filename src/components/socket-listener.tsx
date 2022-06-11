import React, { useEffect } from 'react';
import { FriendService } from 'src/services/friend.service';
import { setNotifCount } from 'src/redux/states/notification';
import { useSocket } from 'src/contexts/socket.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { selectUsername } from 'src/redux/states/user';
import { setFriendOffline, setFriendOnline } from 'src/redux/states/friend';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

interface Props {
  children: React.ReactNode;
}

export const SocketListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectUsername);
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
      socket.on('friend-connected', (userId: string) => {
        dispatch(setFriendOnline(userId));
      });
      socket.on('friend-disconnected', (userId: string) => {
        dispatch(setFriendOffline(userId));
      });
    }

    return () => {
      socket.off('notify-new-fr');
      socket.off('notify-update-fr');
      socket.off('friend-connected');
      socket.off('friend-disconnected');
    };
  }, [isLoggedIn]);

  return <>{children}</>;
};
