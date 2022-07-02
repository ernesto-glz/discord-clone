import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { listenedToSocket } from 'src/redux/states/meta';
import { actions as selfUser } from 'src/redux/states/user';
import { actions as channels } from 'src/redux/states/channels';
import { actions as friends } from 'src/redux/states/friend';
import { actions as requests } from 'src/redux/states/requests';
import { actions as messages } from 'src/redux/states/messages';
import { actions as typing } from 'src/redux/states/typing';
import { ws } from 'src/ws/websocket';
import store from 'src/redux/configure-store';
import fetchEntities from 'src/redux/actions/fetch-entities';
import { logOut } from 'src/redux/states/user';
import { AuthErrors } from 'src/config/constants';
import { useNavigate } from 'react-router-dom';
import { playSound } from 'src/utils/sounds';
import { initPings } from 'src/redux/states/pings';
import { WS } from '@discord/types';
import { getJwt } from 'src/utils/user';

interface Props {
  children: React.ReactNode;
}

const state = () => store.getState();

export const WSListeners: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.getState().meta.hasListenedToSocket) return;

    ws.on('connect', () => ws.emit('READY', { jwt: getJwt() }));
    ws.on('connect_error', (error) => {
      if (Object.values(AuthErrors).indexOf(error.message) <= -1) 
        return console.log(error);
      dispatch(logOut());
    });
    ws.on('READY', () => {
      dispatch(fetchEntities());
      dispatch(initPings());
    });
    ws.on('PRESENCE_UPDATE', ({ userId, status }: WS.Args.PresenceUpdate) => {
      dispatch(friends.updatePresence({ userId, user: { status } }));
    });
    ws.on('MESSAGE_CREATE', ({ data: message }: { data: WS.Args.MessageCreate }) => {
      const { activeChannel } = state().ui;
      const { _id: selfId, hiddenDMChannels } = state().user;
      const { channelId, sender } = message;
      const channel = state().channels.find((c) => c._id === channelId);
      const isHiddenChannel = hiddenDMChannels!.includes(channelId);
      
      if (channel!.type === 'DM' && sender !== selfId && isHiddenChannel) {
        const filtered = hiddenDMChannels!.filter((cId) => cId !== channelId);
        dispatch(selfUser.updated({ hiddenDMChannels: filtered }));
      }

      if (!activeChannel || activeChannel._id !== channelId) {
        playSound('NEW_MESSAGE');
      }

      dispatch(messages.created(message));
    });
    ws.on('CHANNEL_DISPLAY', ({ channelId }: WS.Args.ChannelUpdate) => {
      const { hiddenDMChannels } = state().user;
      const filtered = hiddenDMChannels!.filter((cId) => cId !== channelId);
      dispatch(selfUser.updated({ hiddenDMChannels: filtered }));
      navigate(`/channels/@me/${channelId}`, { replace: true });
    });
    ws.on('CHANNEL_HIDE', ({ channelId }: WS.Args.ChannelUpdate) => {
      const { hiddenDMChannels } = state().user;
      const activeChannel = state().ui.activeChannel;
      const data = [...hiddenDMChannels!, channelId];
      
      dispatch(selfUser.updated({hiddenDMChannels: data }));
      
      if (activeChannel && activeChannel._id === channelId)
        navigate('/channels/@me');
    });
    ws.on('NEW_FRIEND', ({ user, request, type, channel }) => {
      const { _id, hiddenDMChannels } = state().user;
      const data = [...hiddenDMChannels!, channel._id];
      dispatch(friends.addFriend(user));
      dispatch(requests.removeRequest({ request, type }));
      dispatch(selfUser.updated({ hiddenDMChannels: data }));
      dispatch(channels.created({ channel, myId: _id! }));
    });
    ws.on('FRIEND_REQUEST_CREATE', ({ request, type }: WS.Args.RequestCreate) => {
      dispatch(requests.addRequest({ request, type }));
    });
    ws.on('FRIEND_REQUEST_REMOVE', ({ request, type }: WS.Args.RequestRemove) => {
      dispatch(requests.removeRequest({ request, type }));
    });
    ws.on('TYPING_START', (args: WS.Args.Typing) => {
      const timeout = setTimeout(() => dispatch(typing.userStoppedTyping(args)), 20000);
      dispatch(typing.userTyped({ ...args, timer: timeout }));
    });
    ws.on('TYPING_STOP', (args: WS.Args.Typing) => {
      dispatch(typing.userStoppedTyping(args));
    });

    dispatch(listenedToSocket());
  }, []);

  return <>{children}</>;
};
