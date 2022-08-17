import { WS } from '@discord/types';
import fetchEntities from 'src/store/actions/fetch-entities';
import { actions as auth } from 'src/store/states/auth';
import { actions as users } from 'src/store/states/users';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from './ws-events';

export default class implements WSEvent<'READY'> {
  public on = 'READY' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.Ready) {
    dispatch(fetchEntities());
    dispatch(users.fetched([args.user]));
    dispatch(auth.ready(args.user));
  }
}
