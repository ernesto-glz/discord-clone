import React, { useEffect } from 'react';
import { FriendService } from 'src/services/friend.service';
import { setNotifCount } from 'src/redux/states/notification';
import { useWS } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { selectUsername } from 'src/redux/states/user';
import {
  addFriend,
  setFriendOffline,
  setFriendOnline
} from 'src/redux/states/friend';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { hasListenedToSocket, listenedToSocket } from 'src/redux/states/meta';
import { fetchDMChannels } from 'src/redux/states/channels';

interface Props {
  children: React.ReactNode;
}

export const WSListeners: React.FC<Props> = ({ children }) => {
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

    ws.on('NEW_FR', fetchNotifications);
    ws.on('UPDATE_FR', fetchNotifications);
    ws.on('FRIEND_CONNECTED', (userId: string) =>
      dispatch(setFriendOnline(userId))
    );
    ws.on('FRIEND_DISCONNECTED', (userId: string) =>
      dispatch(setFriendOffline(userId))
    );
    ws.on('NEW_DM_CHAT', () => dispatch(fetchDMChannels()));
    ws.on('NEW_FRIEND', (user) => {
      dispatch(addFriend(user));
    });

    dispatch(listenedToSocket());
  }, [isLoggedIn, hasListened]);

  return <>{children}</>;
};
