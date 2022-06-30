import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateEventDelay } from 'src/utils/date';
import { ws } from 'src/ws/websocket';
import { AppDispatch, RootState } from '../configure-store';

export type TypingState = {
  userId: string;
  channelId: string;
  timer: NodeJS.Timeout;
};

const slice = createSlice({
  name: 'typing',
  initialState: [] as TypingState[],
  reducers: {
    userTyped: (typing, { payload }: PayloadAction<TypingState>) => {
      const alreadyExists = typing.find((e) => {
        return e.userId === payload.userId && e.channelId === payload.channelId;
      });

      if (alreadyExists) {
        // Clear previous timeout and set new one
        clearTimeout(alreadyExists.timer);
        Object.assign(alreadyExists, payload);
        return;
      }

      typing.push(payload);
    },
    userStoppedTyping: (typing, { payload }: PayloadAction<TypingState>) => {
      const index = getIndex(typing, payload.userId, payload.channelId);
      typing.splice(index, 1);
    }
  }
});

const getIndex = (typing: any[], userId: string, channelId: string) => {
  return typing.findIndex(
    (t) => t.channelId === channelId && t.userId === userId
  );
};

export const actions = slice.actions;
export default slice.reducer;

export const getTypersInChannel = (channelId: string) =>
  createSelector(
    (state: RootState) => state.typing,
    (typing) => typing.filter((t) => t.channelId === channelId)
  );

let lastTypedAt: Date;

export const startTyping =
  (channelId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    // Set Message delay
    const now = new Date();
    if (lastTypedAt && !calculateEventDelay(lastTypedAt, now)) return;
    lastTypedAt = new Date();

    ws.emit('TYPING_START', { channelId });
  };

export const stopTyping =
  (channelId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    // Reset message delay
    const now = new Date();
    lastTypedAt = new Date(now.getTime() - 50 * 1000);

    ws.emit('TYPING_STOP', { channelId });
  };
