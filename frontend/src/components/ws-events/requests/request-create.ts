import { WS } from '@discord/types';
import { actions as requests } from 'src/store/states/requests';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'FRIEND_REQUEST_CREATE'> {
  public on = 'FRIEND_REQUEST_CREATE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, { request }: WS.Args.RequestCreate) {
    dispatch(requests.added(request));
  }
}
