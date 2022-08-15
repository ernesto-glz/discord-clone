import { ready } from 'src/store/states/auth';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'connect'> {
  public on = 'connect' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: any) {
    dispatch(ready());
  }
}
