import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
