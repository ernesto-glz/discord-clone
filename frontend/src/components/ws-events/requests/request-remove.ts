import { WS } from '@discord/types';
import { actions as requests } from 'src/store/states/requests';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'FRIEND_REQUEST_REMOVE'> {
  public on = 'FRIEND_REQUEST_REMOVE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, { requestId }: WS.Args.RequestRemove) {
    dispatch(requests.removed({ requestId }));
  }
}
