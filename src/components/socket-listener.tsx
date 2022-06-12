import React, { useEffect } from 'react';
import { FriendService } from 'src/services/friend.service';
import { setNotifCount } from 'src/redux/states/notification';
import { useWS } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { selectUsername } from 'src/redux/states/user';
import { setFriendOffline, setFriendOnline } from 'src/redux/states/friend';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { hasListenedToSocket, listenedToSocket } from 'src/redux/states/meta';

interface Props {
  children: React.ReactNode;
}

export const SocketListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectUsername);
  const hasListened = useAppSelector(hasListenedToSocket);
  const { callEndpoint } = useFetchAndLoad();
  const ws = useWS();

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
    if (hasListened) return;

    ws.on('notify-new-fr', fetchNotifications);
    ws.on('notify-update-fr', fetchNotifications);
    ws.on('friend-connected', (userId: string) =>
      dispatch(setFriendOnline(userId))
    );
    ws.on('friend-disconnected', (userId: string) =>
      dispatch(setFriendOffline(userId))
    );

    dispatch(listenedToSocket());
  }, [isLoggedIn, hasListened]);

  return <>{children}</>;
};
