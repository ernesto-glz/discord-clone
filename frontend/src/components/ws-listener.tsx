import React, { useEffect } from 'react';
import { actions as meta } from 'src/redux/states/meta';
import { actions as auth, logoutUser } from 'src/redux/states/auth';
import { actions as channels } from 'src/redux/states/channels';
import { actions as requests } from 'src/redux/states/requests';
import { actions as messages } from 'src/redux/states/messages';
import { actions as typing } from 'src/redux/states/typing';
import { actions as users } from 'src/redux/states/users';
import fetchEntities from 'src/redux/actions/fetch-entities';
import { useNavigate } from 'react-router-dom';
import { playSound } from 'src/utils/sounds';
import { WS, Entity } from '@discord/types';
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
      dispatch(logoutUser());
      navigate('/login', { replace: true })
    });
    ws.on('READY', (data) => {
      dispatch(fetchEntities());
      dispatch(auth.ready(data.user))
      dispatch(users.fetched([data.user]))
      // dispatch(initPings());
    });
    ws.on('PRESENCE_UPDATE', ({ userId, status }: WS.Args.PresenceUpdate) => {
      dispatch(users.updated({ userId, user: { status } }));
    });
    ws.on('MESSAGE_CREATE', ({ message }: { message: Entity.Message }) => {
      const { activeChannel } = state().ui;
      const { id: selfId, activeDMCS } = state().auth.user!;
      const { channelId, sender } = message;
      const channel = state().channels.find((c) => c.id === channelId);
      const isActiveChannel = activeDMCS.includes(channelId);
      
      if (channel!.type === 'DM' && sender !== selfId && !isActiveChannel) {
        dispatch(auth.updatedUser({ activeDMCS: [...activeDMCS, channelId] }));
      }

      if (!activeChannel || activeChannel.id !== channelId)
        playSound('NEW_MESSAGE');

      dispatch(messages.created(message));
    });
    ws.on('CHANNEL_DISPLAY', ({ channelId }: WS.Args.ChannelUpdate) => {
      const { activeDMCS } = state().auth.user!;
      const data = [...activeDMCS, channelId];
      
      if (!activeDMCS.find((a) => a === channelId))
        dispatch(auth.updatedUser({ activeDMCS: data }));

      navigate(`/channels/@me/${channelId}`);
    });
    ws.on('CHANNEL_HIDE', ({ channelId }: WS.Args.ChannelUpdate) => {
      const { activeDMCS } = state().auth.user!;
      const filtered = activeDMCS.filter((cId) => cId !== channelId);
      const activeChannel = state().ui.activeChannel;
      
      dispatch(auth.updatedUser({ activeDMCS: filtered }));
      
      if (activeChannel?.id === channelId)
        navigate('/channels/@me');
    });
    ws.on('NEW_FRIEND', ({ user, requestId, channel }) => {
      const { id: selfId, guildIds, friendIds } = state().auth.user!
      const partialUser = {
        guildIds: [...guildIds, channel.guildId],
        friendIds: [...friendIds, user.id]
      };

      dispatch(users.updated({ userId: selfId, user: partialUser }))
      dispatch(users.fetched([user]));
      dispatch(channels.fetched([channel]));
      dispatch(auth.updatedUser(partialUser))
      dispatch(requests.removed({ requestId }));
    });
    ws.on('FRIEND_REQUEST_CREATE', ({ request }: WS.Args.RequestCreate) => {
      dispatch(requests.added(request));
    });
    ws.on('FRIEND_REQUEST_REMOVE', ({ requestId }: WS.Args.RequestRemove) => {
      dispatch(requests.removed({ requestId }));
    });
    ws.on('TYPING_START', (args: WS.Args.Typing) => {
      const timeout = setTimeout(() => dispatch(typing.userStoppedTyping(args)), 20000);
      dispatch(typing.userTyped({ ...args, timer: timeout }));
    });
    ws.on('TYPING_STOP', (args: WS.Args.Typing) => {
      dispatch(typing.userStoppedTyping(args));
    });

    dispatch(meta.listenedToWS());
  }, []);

  return null;
};
