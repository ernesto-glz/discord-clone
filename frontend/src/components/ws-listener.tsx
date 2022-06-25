import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { listenedToSocket } from 'src/redux/states/meta';
import { actions as selfUser } from 'src/redux/states/user';
import { actions as channels } from 'src/redux/states/channels';
import { actions as friends } from 'src/redux/states/friend';
import { actions as requests } from 'src/redux/states/requests';
import { actions as messages } from 'src/redux/states/messages';
import { ws } from 'src/contexts/ws.context';
import store from 'src/redux/configure-store';
import fetchEntities from 'src/redux/actions/fetch-entities';
import { logOut } from 'src/redux/states/user';
import { AuthErrors } from 'src/config/constants';
import { useNavigate } from 'react-router-dom';
import { playSound } from 'src/utils/sounds';
import { initPings } from 'src/redux/states/pings';

interface Props {
  children: React.ReactNode;
}

const state = () => store.getState();

export const WSListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.getState().meta.hasListenedToSocket) return;

    ws.on('connect', () => ws.emit('READY'));
    ws.on('connect_error', (error) => {
      if (Object.values(AuthErrors).indexOf(error.message) > -1) {
        dispatch(logOut());
        return;
      }
      console.log(error);
    });
    ws.on('READY', (args) => {
      dispatch(fetchEntities());
      dispatch(initPings());
    });
    ws.on('PRESENCE_UPDATE', ({ userId, status }) => {
      dispatch(friends.updatePresence({ userId, user: { status } }));
    });
    ws.on('MESSAGE_CREATE', (newMessage, id) => {
      const { activeChannel } = state().ui;
      const { _id: myId, hiddenDMChannels } = state().user;
      const channelInfo = state().channels.find((c) => c._id === id);
      if (
        channelInfo!.type === 'DM' &&
        newMessage.sender._id !== myId
      ) {
        if (hiddenDMChannels!.includes(id)) {
          const filtered = hiddenDMChannels!.filter((cId) => cId !== id);
          dispatch(selfUser.updated({ hiddenDMChannels: filtered }));
        }
        if (activeChannel !== id) {
          playSound('NEW_MESSAGE');
        }
      }
      dispatch(messages.addMessage(newMessage));
    });
    ws.on('CHANNEL_DISPLAY', (channelId) => {
      const { hiddenDMChannels } = state().user;
      const filtered = hiddenDMChannels!.filter((cId) => cId !== channelId);
      dispatch(selfUser.updated({ hiddenDMChannels: filtered }));
      navigate(`/channels/@me/${channelId}`, { replace: true });
    });
    ws.on('CHANNEL_HIDE', (channelId) => {
      const { hiddenDMChannels } = state().user;
      dispatch(
        selfUser.updated({
          hiddenDMChannels: [...hiddenDMChannels!, channelId]
        })
      );
      if (state().ui.activeChannel === channelId) navigate('/channels/@me');
    });
    ws.on('NEW_FRIEND', ({ user, requestId, type, channel }) => {
      const { guildIds, _id, hiddenDMChannels } = state().user;
      dispatch(friends.addFriend(user));
      dispatch(requests.removeRequest({ requestId, type }));
      dispatch(
        selfUser.updated({
          gildIds: [...guildIds!, channel.guildId],
          hiddenDMChannels: [...hiddenDMChannels!, channel._id]
        })
      );
      dispatch(channels.created({ channel, myId: _id! }));
    });
    ws.on('FRIEND_REQUEST_CREATE', ({ request, type }) => {
      dispatch(requests.addRequest({ request, type }));
    });
    ws.on('FRIEND_REQUEST_REMOVE', ({ request, type }) => {
      dispatch(requests.removeRequest({ requestId: request._id, type }));
    });

    dispatch(listenedToSocket());
  }, []);

  return <>{children}</>;
};
