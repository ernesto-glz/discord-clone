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
    ws.on('MESSAGE_CREATE', (newMessage, id) => {
      const { activeChannel } = state().ui;
      const { _id: myId, hiddenDMChannels } = state().user;
      const channelInfo = state().channels.find((c) => c._id === id);
      if (
        channelInfo!.type === 'DM_CHANNEL' &&
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
      if (activeChannel && activeChannel !== id) return;
    });
    ws.on('DISPLAY_CHANNEL', (channelId) => {
      const { hiddenDMChannels } = state().user;
      const filtered = hiddenDMChannels!.filter((cId) => cId !== channelId);
      dispatch(selfUser.updated({ hiddenDMChannels: filtered }));
      navigate(`/channels/@me/${channelId}`, { replace: true });
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
