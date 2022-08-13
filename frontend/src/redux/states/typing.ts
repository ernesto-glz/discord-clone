import { createSelector, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { getDiffInSeconds, lessThan } from 'src/utils/date';
import { WS } from '@discord/types';
import { Store } from 'types/store';
import { actions as api } from './api';

const slice = createSlice({
  name: 'typing',
  initialState: [] as Store.AppState['typing'],
  reducers: {
    userTyped: (typing, { payload }: PayloadAction<WS.Args.Typing & { timer: NodeJS.Timer }>) => {
      const alreadyExists = typing.find((e) => {
        return e.userId === payload.userId && e.channelId === payload.channelId;
      });

      if (!alreadyExists) return [...typing, payload];

      clearTimeout(alreadyExists.timer);
      Object.assign(alreadyExists, payload);
    },
    userStoppedTyping: (typing, { payload }: PayloadAction<WS.Args.Typing>) => {
      const index = getIndex(typing, payload.userId, payload.channelId);
      typing.splice(index, 1);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

const getIndex = (typing: any[], userId: string, channelId: string) => {
  return typing.findIndex((t) => t.channelId === channelId && t.userId === userId);
};

export const getTypersInChannel = (channelId: string) => createSelector(
  (state: Store.AppState) => state.typing,
  (typing) => typing.filter((t) => t.channelId === channelId)
);

let lastTypedAt: Date;

export const startTyping = (channelId: string) => (dispatch: Dispatch) => {
  const secondsAgo = getDiffInSeconds(new Date(), lastTypedAt);

  if (lastTypedAt && secondsAgo < 5) return;
  lastTypedAt = new Date();

  dispatch(api.wsCallBegan({
    event: 'TYPING_START',
    data: { channelId }
  }));
};

export const stopTyping = (channelId: string) => (dispatch: Dispatch) => {
  // Reset message delay
  const now = new Date();
  lastTypedAt = new Date(now.getTime() - 50 * 1000);

  dispatch(api.wsCallBegan({
    event: 'TYPING_STOP',
    data: { channelId }
  }));
};
