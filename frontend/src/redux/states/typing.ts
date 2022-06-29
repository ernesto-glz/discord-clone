import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { ws } from 'src/ws/websocket';
import { RootState } from '../configure-store';

export type TypingState = { userId: string; channelId: string };

const slice = createSlice({
  name: 'typing',
  initialState: [] as TypingState[],
  reducers: {
    userTyped: (typing, { payload }: PayloadAction<TypingState>) => {
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
  (channelId: string) => (dispatch: any, getState: () => RootState) => {
    const secsAgo = moment(new Date()).diff(lastTypedAt, 'seconds');
    if (lastTypedAt && secsAgo < 10) return;

    lastTypedAt = new Date();

    ws.emit('TYPING_START', { channelId });
  };

export const stopTyping =
  (channelId: string) => (dispatch: any, getState: () => RootState) => {
    lastTypedAt = new Date(Date.now() - 20000);
    ws.emit('TYPING_STOP', { channelId });
  };
