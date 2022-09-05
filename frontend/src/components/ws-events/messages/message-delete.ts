import { WS } from '@discord/types';
import { actions as messages } from 'src/store/states/messages';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'MESSAGE_DELETE'> {
  public on = 'MESSAGE_DELETE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.MessageDelete) {
    dispatch(messages.deleted(args));
  }
}
