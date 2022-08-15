import { WS } from '@discord/types';
import { actions as auth} from 'src/store/states/auth';
import { actions as channels } from 'src/store/states/channels';
import { actions as users } from 'src/store/states/users';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'USER_UPDATE'> {
  public on = 'USER_UPDATE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.UserUpdate) {
    const selfId = state().auth.user!.id;
    const isSelf = selfId === args.userId;
    const dmChannel = state().channels.find((c) => c.dmUserId === args.userId);

    dispatch(users.updated(args));
    if (isSelf) dispatch(auth.updatedUser(args.partialUser));

    if (!dmChannel) return;
    const user = state().users.find((u) => u.id === args.userId)!;
    dispatch(channels.updated({
      id: dmChannel.id,
      avatar: user.avatar,
      name: user.username,
    }));
  }
}
