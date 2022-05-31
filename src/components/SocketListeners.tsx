import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FriendService } from 'src/services/friend.service';
import { setNotifCount } from 'src/redux/states/notification';
import { useSocket } from 'src/contexts/socket.context';
import { UserState } from 'src/models/user.model';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';

interface Props {
  children: React.ReactNode;
}

export const SocketListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state.user.username);
  const { callEndpoint } = useFetchAndLoad();

  const fetchNotifications = async () => {
    if (user) {
      const { data } = await callEndpoint(FriendService.getPendingRequests());
      if (data?.length) {
        dispatch(setNotifCount(data.length));
      } else {
        dispatch(setNotifCount(0));
      }
    }
  };
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('notify-new-fr', fetchNotifications);
      socket.on('notify-update-fr', fetchNotifications);
    }

    return () => {
      socket.off('notify-new-fr');
      socket.off('notify-update-fr');
    };
  }, [user]);

  return <>{children}</>;
};
