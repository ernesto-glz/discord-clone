import { AuthErrors } from 'src/config/constants';
import { actions as auth, logoutUser } from 'src/store/states/auth';
import { actions as meta } from 'src/store/states/meta';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'connect_error'> {
  public on = 'connect_error' as const;

  public invoke(state: AppState, dispatch: AppDispatch, error: any) {
    if (state().meta.fetchedEntities) {
      dispatch(meta.timeout());
      dispatch(auth.loggedOut());
    }

    if (Object.values(AuthErrors).indexOf(error.message) < 0)
      return console.log('[WS]: Connection to the server lost.');

    dispatch(logoutUser());
    events.emit('navigate', '/login');
  }
}
