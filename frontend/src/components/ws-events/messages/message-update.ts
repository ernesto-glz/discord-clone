import { WS } from '@discord/types';
import { actions as messages } from 'src/store/states/messages';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'MESSAGE_UPDATE'> {
  public on = 'MESSAGE_UPDATE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.MessageUpdate) {
    dispatch(messages.updated(args));
  }
}
