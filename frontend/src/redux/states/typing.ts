import { createSelector, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { lessThan } from 'src/utils/date';
import { ws } from 'src/ws/websocket';
import { WS } from '@discord/types';
import { Store } from 'types/store';

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

const getIndex = (typing: any[], userId: string, channelId: string) => {
  return typing.findIndex(
    (t) => t.channelId === channelId && t.userId === userId
  );
};

export const actions = slice.actions;
export default slice.reducer;

export const getTypersInChannel = (channelId: string) =>
  createSelector(
    (state: Store.AppState) => state.typing,
    (typing) => typing.filter((t) => t.channelId === channelId)
  );

let lastTypedAt: Date;

export const startTyping =
  (channelId: string) => (dispatch: Dispatch, getState: () => Store.AppState) => {
    // Set Message delay
    const now = new Date();
    if (lastTypedAt && !lessThan(lastTypedAt, now, 5)) return;
    lastTypedAt = new Date();

    ws.emit('TYPING_START', { channelId });
  };

export const stopTyping =
  (channelId: string) => (dispatch: Dispatch, getState: () => Store.AppState) => {
    // Reset message delay
    const now = new Date();
    lastTypedAt = new Date(now.getTime() - 50 * 1000);

    ws.emit('TYPING_STOP', { channelId });
  };
