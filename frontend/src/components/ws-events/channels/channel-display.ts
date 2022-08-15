import { WS } from '@discord/types';
import { actions as auth } from 'src/store/states/auth';
import { AppDispatch, AppState } from 'src/store/store';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'CHANNEL_DISPLAY'> {
  public on = 'CHANNEL_DISPLAY' as const;

  public invoke(state: AppState, dispatch: AppDispatch, { channelId }: WS.Args.ChannelUpdate) {
    const { activeDMCS } = state().auth.user!;
    const data = [...activeDMCS, channelId];

    if (!activeDMCS.find((a) => a === channelId))
      dispatch(auth.updatedUser({ activeDMCS: data }));

    events.emit('navigate', `/channels/@me/${channelId}`);
  }
}
