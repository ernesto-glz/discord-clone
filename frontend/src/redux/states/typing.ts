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
      const alreadyExists = typing.find((e) => {
        return e.userId === payload.userId && e.channelId === payload.channelId;
      });
      if (alreadyExists) return;
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

export const startTyping =
  (channelId: string) => (dispatch: any, getState: () => RootState) => {
    ws.emit('TYPING_START', { channelId });
  };

export const stopTyping =
  (channelId: string) => (dispatch: any, getState: () => RootState) => {
    ws.emit('TYPING_STOP', { channelId });
  };
