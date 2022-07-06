import React, { useEffect } from 'react';
import { listenedToSocket } from 'src/redux/states/meta';
import { actions as auth } from 'src/redux/states/auth';
import { actions as channels } from 'src/redux/states/channels';
import { actions as friends } from 'src/redux/states/friend';
import { actions as requests } from 'src/redux/states/requests';
import { actions as messages } from 'src/redux/states/messages';
import { actions as typing } from 'src/redux/states/typing';
import { actions as users } from 'src/redux/states/users';
import fetchEntities from 'src/redux/actions/fetch-entities';
import { useNavigate } from 'react-router-dom';
import { playSound } from 'src/utils/sounds';
import { WS } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { AuthErrors } from 'src/config/constants';
import { store } from 'src/redux/configure-store';
import { ws } from 'src/ws/websocket';

export const WSListeners: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const state = () => store.getState();

  useEffect(() => {
    if (state().meta.hasListenedToWS) return;

    ws.on('connect_error', (error) => {
      if (Object.values(AuthErrors).indexOf(error.message) < 0) 
        return console.log(error);
      dispatch(auth.logOut());
      navigate('/login', { replace: true })
    });
    ws.on('READY', (data) => {
      dispatch(fetchEntities());
      dispatch(auth.ready(data.user))
      // dispatch(initPings());
    });
    ws.on('PRESENCE_UPDATE', ({ userId, status }: WS.Args.PresenceUpdate) => {
      dispatch(users.updated({ userId, user: { status } }));
    });
    ws.on('MESSAGE_CREATE', ({ data: message }: { data: WS.Args.MessageCreate }) => {
      const { activeChannel } = state().ui;
      const { _id: selfId, hiddenDMChannels } = state().auth.user!;
      const { channelId, sender } = message;
      const channel = state().channels.find((c) => c._id === channelId);
      const isHiddenChannel = hiddenDMChannels!.includes(channelId);
      
      if (channel!.type === 'DM' && sender !== selfId && isHiddenChannel) {
        const filtered = hiddenDMChannels!.filter((cId) => cId !== channelId);
        dispatch(auth.updated({ hiddenDMChannels: filtered }));
      }

      if (!activeChannel || activeChannel._id !== channelId)
        playSound('NEW_MESSAGE');

      dispatch(messages.created(message));
    });
    ws.on('CHANNEL_DISPLAY', ({ channelId }: WS.Args.ChannelUpdate) => {
      const { hiddenDMChannels } = state().auth.user!;
      const filtered = hiddenDMChannels!.filter((cId) => cId !== channelId);
      dispatch(auth.updated({ hiddenDMChannels: filtered }));
      navigate(`/channels/@me/${channelId}`, { replace: true });
    });
    ws.on('CHANNEL_HIDE', ({ channelId }: WS.Args.ChannelUpdate) => {
      const { hiddenDMChannels } = state().auth.user!;
      const activeChannel = state().ui.activeChannel;
      const data = [...hiddenDMChannels!, channelId];
      
      dispatch(auth.updated({ hiddenDMChannels: data }));
      
      if (activeChannel && activeChannel._id === channelId)
        navigate('/channels/@me');
    });
    ws.on('NEW_FRIEND', ({ user, request, type, channel }) => {
      const { _id, hiddenDMChannels } = state().auth.user!;
      const data = [...hiddenDMChannels, channel._id];

      dispatch(users.added(user))
      dispatch(friends.addFriend(user._id));
      dispatch(requests.removeRequest({ request, type }));
      dispatch(auth.updated({ hiddenDMChannels: data }));
      dispatch(channels.created({ channel, selfId: _id! }));
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

  return null;
};
