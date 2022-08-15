import { WS } from '@discord/types';
import { actions as users } from 'src/store/states/users';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'PRESENCE_UPDATE'> {
  public on = 'PRESENCE_UPDATE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, { userId, status }: WS.Args.PresenceUpdate) {
    dispatch(users.updated({ userId, partialUser: { status } }));
  }
}
