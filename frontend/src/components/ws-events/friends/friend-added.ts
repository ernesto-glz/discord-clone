import { WS } from '@discord/types';
import { actions as auth } from 'src/store/states/auth';
import { actions as channels } from 'src/store/states/channels';
import { actions as requests } from 'src/store/states/requests';
import { actions as users } from 'src/store/states/users';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'FRIEND_ADDED'> {
  public on = 'FRIEND_ADDED' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.FriendAdded) {
    const { requestId, user, channel } = args;
    const { id: selfId, guildIds, friendIds, activeDMCS, } = state().auth.user!;
    const partialUser = {
      guildIds: [...guildIds, channel.guildId],
      friendIds: [...friendIds, user.id],
      activeDMCS: [...activeDMCS, channel.id],
    };

    dispatch(users.updated({ userId: selfId, partialUser }));
    dispatch(users.fetched([user]));
    dispatch(channels.fetched([channel]));
    dispatch(auth.updatedUser(partialUser));
    dispatch(requests.removed({ requestId }));
  }
}
