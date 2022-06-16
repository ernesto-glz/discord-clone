import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { listenedToSocket } from 'src/redux/states/meta';
import { actions as channels } from 'src/redux/states/channels';
import { actions as friends } from 'src/redux/states/friend';
import { actions as requests } from 'src/redux/states/requests';
import { ws } from 'src/contexts/ws.context';
import store from 'src/redux/configure-store';
import fetchEntities from 'src/redux/actions/fetch-entities';
import { logOut } from 'src/redux/states/user';
import { AuthErrors } from 'src/config/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const state = () => store.getState();

export const WSListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.getState().meta.hasListenedToSocket) return;

    ws.on('connect_error', (error) => {
      if (Object.values(AuthErrors).indexOf(error.message) > -1) {
        dispatch(logOut());
        return;
      }
      console.log(error);
    });
    ws.on('READY', () => {
      dispatch(fetchEntities());
    });
    ws.on('PRESENCE_UPDATE', ({ userId, status }) => {
      dispatch(friends.updatePresence({ userId, user: { status } }));
    });
    ws.on('CHANNEL_CREATE', (args) => {
      const { user } = state();

      if (args.channel.type === 'DM_CHANNEL') {
        dispatch(channels.created({ ...args, myId: user._id }));
      } else {
        dispatch(channels.created(args));
      }

      const selfCreated = user._id === args.channel.createdBy;
      if (selfCreated) {
        navigate(`/channels/@me/${args.channel._id}`, { replace: true });
      }
    });
    ws.on('CHANNEL_GO', (channelId) => {
      navigate(`/channels/@me/${channelId}`, { replace: true });
    });
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
