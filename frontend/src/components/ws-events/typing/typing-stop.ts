import { WS } from '@discord/types';
import { actions as typing } from 'src/store/states/typing';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'TYPING_STOP'> {
  public on = 'TYPING_STOP' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.Typing) {
    dispatch(typing.userStoppedTyping(args));
  }
}
