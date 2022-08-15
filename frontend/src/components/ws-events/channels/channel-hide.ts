import { WS } from '@discord/types';
import { actions as auth } from 'src/store/states/auth';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'CHANNEL_HIDE'> {
  public on = 'CHANNEL_HIDE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, { channelId }: WS.Args.ChannelUpdate) {
    const { activeDMCS } = state().auth.user!;
    const filtered = activeDMCS.filter((cId) => cId !== channelId);
    const activeChannel = state().ui.activeChannel;

    dispatch(auth.updatedUser({ activeDMCS: filtered }));

    if (activeChannel?.id === channelId)
      events.emit('navigate', '/channels/@me');
  }
}
