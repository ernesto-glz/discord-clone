import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { AppDispatch, RootState } from '../configure-store';

type PingPayload = { channelId: string; guildId: string };
type Pings = { [guildId: string]: string[] };

export const slice = createSlice({
  name: 'pings',
  initialState: {} as Pings,
  reducers: {
    initialized: (pings, { payload }: PayloadAction<Pings>) => {
      Object.assign(pings, payload);
    },
    added: (pings, { payload }: PayloadAction<PingPayload>) => {
      pings[payload.guildId].push(payload.channelId);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const initPings = () => (dispatch: AppDispatch) => {
  const user = store.getState().user!;
  const channels = store.getState().channels;
  const pings: Pings = {};

  for (const channel of channels) {
    const lastReadId = user.lastReadMessageIds[channel._id];
    if (true || lastReadId === channel.lastMessageId) {
      pings[channel._id] = pings[channel._id] ?? [];
      pings[channel._id].push(channel._id);
    }
  }
  dispatch(actions.initialized(pings));
};
