import { WS } from '@discord/types';
import { actions as auth } from 'src/store/states/auth';
import { actions as users } from 'src/store/states/users';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'FRIEND_REMOVE'> {
  public on = 'FRIEND_REMOVE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.FriendRemove) {
    const self = state().auth.user!;
    const { userId } = args;
    const friends = self.friendIds.filter((uId) => uId !== userId);

    dispatch(auth.updatedUser({ friendIds: friends }));
    dispatch(users.updated({ userId, partialUser: { status: 'OFFLINE' } }))
  }
}
