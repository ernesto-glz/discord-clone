import { WS } from '@discord/types';
import { actions as auth } from 'src/store/states/auth';
import { actions as channels } from 'src/store/states/channels';
import { actions as requests } from 'src/store/states/requests';
import { actions as users } from 'src/store/states/users';
import { AppDispatch, AppState } from 'src/store/store';
import { notRepeated } from 'src/utils/utils';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'FRIEND_ADDED'> {
  public on = 'FRIEND_ADDED' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.FriendAdded) {
    const { requestId, user, channel } = args;
    const { id: selfId, guildIds, friendIds, activeDMCS, } = state().auth.user!;
    const partialUser = {
      activeDMCS: notRepeated(activeDMCS, channel.id),
      guildIds: notRepeated(guildIds, channel.guildId),
      friendIds: notRepeated(friendIds, user.id),
    };

    dispatch(users.updated({ userId: selfId, partialUser }));
    dispatch(users.added(user));
    dispatch(channels.fetched([channel]));
    dispatch(auth.updatedUser(partialUser));
    dispatch(requests.removed({ requestId }));
  }
}
