import { WS } from '@discord/types';
import { actions as auth } from 'src/store/states/auth';
import { actions as messages } from 'src/store/states/messages';
import { AppDispatch, AppState } from 'src/store/store';
import { playSound } from 'src/utils/sounds';
import { moveToStart } from 'src/utils/utils';
import { WSEvent } from '../ws-events';

export default class implements WSEvent<'MESSAGE_CREATE'> {
  public on = 'MESSAGE_CREATE' as const;

  public invoke(state: AppState, dispatch: AppDispatch, { message }: WS.Args.MessageCreate) {
    const { activeChannel } = state().ui;
    const { id: selfId, activeDMCS } = state().auth.user!;
    const { channelId, sender } = message;
    const channel = state().channels.find((c) => c.id === channelId);
    const isDisplayedChannel = activeDMCS.includes(channelId);
    const DMS = !activeDMCS.includes(channelId)
      ? [...activeDMCS, channelId]
      : [...activeDMCS];
    const notSelf = message.sender !== selfId;

    if (channel!.type === 'DM' && sender !== selfId && !isDisplayedChannel) {
      dispatch(auth.updatedUser({ activeDMCS: DMS }));
    }

    if (
      (!activeChannel ||
        activeChannel.id !== channelId ||
        document.visibilityState === 'hidden') &&
      notSelf
    )
      playSound('NEW_MESSAGE');

    dispatch(messages.created(message));
    dispatch(auth.updatedUser({ activeDMCS: moveToStart(DMS, channel!.id) }));
  }
}
