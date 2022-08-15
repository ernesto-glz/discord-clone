import { WS } from '@discord/types';
import { actions as typing } from 'src/store/states/typing';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'TYPING_START'> {
  public on = 'TYPING_START' as const;

  public invoke(state: AppState, dispatch: AppDispatch, args: WS.Args.Typing) {
    const timeout = setTimeout(() => dispatch(typing.userStoppedTyping(args)), 20000);
    dispatch(typing.userTyped({ ...args, timer: timeout }));
  }
}
