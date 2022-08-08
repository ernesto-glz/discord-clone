import React, { useEffect } from 'react';
import { actions as meta } from 'src/redux/states/meta';
import { actions as auth, logoutUser, ready } from 'src/redux/states/auth';
import { actions as channels } from 'src/redux/states/channels';
import { actions as requests } from 'src/redux/states/requests';
import { actions as messages } from 'src/redux/states/messages';
import { actions as typing } from 'src/redux/states/typing';
import { actions as users } from 'src/redux/states/users';
import { actions as ui } from 'src/redux/states/ui';
import fetchEntities from 'src/redux/actions/fetch-entities';
import { useNavigate } from 'react-router-dom';
import { playSound } from 'src/utils/sounds';
import { WS, Entity } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { AuthErrors } from 'src/config/constants';
import { store } from 'src/redux/store';
import { ws } from 'src/ws/websocket';
import { moveToStart } from 'src/utils/utils';

export const WSListeners: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const state = () => store.getState();

  useEffect(() => {
    if (state().meta.hasListenedToWS) return;

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape' && state().ui.openModals?.length)
        dispatch(ui.closedLastModal());
    });

    ws.on('connect', () => {
      dispatch(ready())
    });
    ws.on('connect_error', (error) => {
      if (state().meta.fetchedEntities) {
        dispatch(meta.timeout());
        dispatch(auth.loggedOut());
      }

      if (Object.values(AuthErrors).indexOf(error.message) < 0)
        return console.log('[WS]: Connection to the server lost.');

      dispatch(logoutUser());
      navigate('/login', { replace: true })
    });
    ws.on('READY', (data) => {
      dispatch(fetchEntities());
      dispatch(auth.ready(data.user));
    });
    ws.on('PRESENCE_UPDATE', ({ userId, status }: WS.Args.PresenceUpdate) => {
      dispatch(users.updated({ userId, partialUser: { status } }));
    });
    ws.on('MESSAGE_CREATE', ({ message }: { message: Entity.Message }) => {
      const { activeChannel } = state().ui;
      const { id: selfId, activeDMCS } = state().auth.user!;
      const { channelId, sender } = message;
      const channel = state().channels.find((c) => c.id === channelId);
      const isDisplayedChannel = activeDMCS.includes(channelId);
      const DMS = !activeDMCS.includes(channelId) ? [...activeDMCS, channelId] : [...activeDMCS];

      if (channel!.type === 'DM' && sender !== selfId && !isDisplayedChannel) {
        dispatch(auth.updatedUser({ activeDMCS: DMS }));
      }

      if (!activeChannel
          || activeChannel.id !== channelId
          || document.visibilityState === 'hidden')
        playSound('NEW_MESSAGE');

      dispatch(messages.created(message));
      dispatch(auth.updatedUser({ activeDMCS: moveToStart(DMS, channel!.id) }))
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
      const { id: selfId, guildIds, friendIds, activeDMCS } = state().auth.user!
      const partialUser = {
        guildIds: [...guildIds, channel.guildId],
        friendIds: [...friendIds, user.id],
        activeDMCS: [...activeDMCS, channel.id]
      };

      dispatch(users.updated({ userId: selfId, partialUser }))
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
    ws.on('USER_UPDATE', (args: WS.Args.UserUpdate) => {
      const selfId = state().auth.user!.id;
      const isSelf = selfId === args.userId;
      const dmChannel = state().channels.find((c) => c.dmUserId === args.userId);

      dispatch(users.updated(args));
      if (isSelf)
        dispatch(auth.updatedUser(args.partialUser));
      if (dmChannel) {
        const user = state().users.find((u) => u.id === args.userId)!;
        dispatch(channels.updated({
          id: dmChannel.id,
          avatar: user.avatar,
          name: user.username
        }));
      }
    });

    dispatch(meta.listenedToWS());
  }, []);

  return null;
};
