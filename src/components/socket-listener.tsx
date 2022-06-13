import React, { useEffect } from 'react';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { FriendService } from 'src/services/friend.service';
import { setNotifCount } from 'src/redux/states/notification';
import { selectUsername } from 'src/redux/states/user';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { listenedToSocket } from 'src/redux/states/meta';
import { fetchDMChannels } from 'src/redux/states/channels';
import {
  addFriend,
  setFriendOffline,
  setFriendOnline
} from 'src/redux/states/friend';
import {
  addIncomingRequest,
  addOutGoingRequest,
  removeIncomingRequest,
  removeOutgoingRequest
} from 'src/redux/states/requests';
import { ws } from 'src/contexts/ws.context';
import store from 'src/redux/configure-store';

interface Props {
  children: React.ReactNode;
}

export const WSListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectUsername);

  const { callEndpoint } = useFetchAndLoad();

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
    if (store.getState().meta.hasListenedToSocket) return;

    // ws.on('NEW_FR', fetchNotifications);
    // ws.on('UPDATE_FR', fetchNotifications);
    ws.on('FRIEND_CONNECTED', (userId: string) =>
      dispatch(setFriendOnline(userId))
    );
    ws.on('FRIEND_DISCONNECTED', (userId: string) =>
      dispatch(setFriendOffline(userId))
    );
    ws.on('NEW_DM_CHAT', () => dispatch(fetchDMChannels()));
    ws.on('NEW_FRIEND', (user, requestId, type) => {
      dispatch(addFriend(user));
      type === 'INCOMING'
        ? dispatch(removeIncomingRequest(requestId))
        : dispatch(removeOutgoingRequest(requestId));
    });
    ws.on('DENIED_FR', (request, type) => {
      type === 'INCOMING'
        ? dispatch(removeIncomingRequest(request._id))
        : dispatch(removeOutgoingRequest(request._id));
    });
    ws.on('NEW_FR', (request, type) => {
      type === 'INCOMING'
        ? dispatch(addIncomingRequest(request))
        : dispatch(addOutGoingRequest(request));
    });

    dispatch(listenedToSocket());
  }, []);

  return <>{children}</>;
};
