import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { listenedToSocket } from 'src/redux/states/meta';
import { fetchDMChannels } from 'src/redux/states/channels';
import { actions as friends } from 'src/redux/states/friend';
import { actions as requests } from 'src/redux/states/requests';
import { ws } from 'src/contexts/ws.context';
import store from 'src/redux/configure-store';
import fetchEntities from 'src/redux/actions/fetch-entities';

interface Props {
  children: React.ReactNode;
}

export const WSListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (store.getState().meta.hasListenedToSocket) return;

    ws.on('READY', () => {
      dispatch(fetchEntities());
    });
    ws.on('FRIEND_CONNECTED', (userId: string) =>
      dispatch(friends.setFriendOnline(userId))
    );
    ws.on('FRIEND_DISCONNECTED', (userId: string) =>
      dispatch(friends.setFriendOffline(userId))
    );
    ws.on('NEW_DM_CHAT', () => dispatch(fetchDMChannels()));
    ws.on('NEW_FRIEND', ({ user, requestId, type }) => {
      dispatch(friends.addFriend(user));
      dispatch(requests.removeRequest({ requestId, type }));
    });
    ws.on('DENIED_FR', (request, type) => {
      dispatch(requests.removeRequest({ requestId: request._id, type }));
    });
    ws.on('NEW_FR', (request, type) => {
      dispatch(requests.addRequest({ request, type }));
    });

    dispatch(listenedToSocket());
  }, []);

  return <>{children}</>;
};
