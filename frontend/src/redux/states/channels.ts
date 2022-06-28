import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { getOrCreateDMChannel, getChannels } from 'src/api/channel';
import { ws } from 'src/ws/websocket';
import { User } from 'src/models/user.model';
import { notInArray } from 'src/utils/redux';
import store, { RootState } from '../configure-store';

export interface Channel {
  _id: string;
  name: string;
  guildId: string;
  userIds: User[];
  dmUser?: User;
  lastMessageId?: string;
  type: 'DM' | 'GUILD_TEXT' | 'GUILD_VOICE';
}

export interface DisplayChannel {
  userId: string;
}

export const slice = createSlice({
  name: 'channel',
  initialState: [] as Channel[],
  reducers: {
    created: (
      channels,
      { payload }: PayloadAction<{ channel: Channel; myId?: string }>
    ) => {
      if (payload.channel.type !== 'DM') {
        return channels.concat(payload.channel);
      }
      const { channel: c, myId } = payload;
      const dmUser: User =
        c.userIds[0]._id === myId ? c.userIds[1] : c.userIds[0];
      return channels.concat({ ...c, name: dmUser.username, dmUser });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (channels, { payload }) => {
      channels.push(...payload.filter(notInArray(channels)));
    });
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const fetchChannels = createAsyncThunk(
  'channel/fetchChannels',
  async () => {
    const myId = store.getState().user._id;
    const response = await getChannels();
    const { data } = response;

    if (!data?.length) return data;

    const withDMChannels = data.map((c: Channel) => {
      if (c.type === 'DM') {
        const dmUser = c.userIds[0]._id === myId ? c.userIds[1] : c.userIds[0];
        return { ...c, name: dmUser.username, dmUser };
      }
      return { ...c };
    });

    return withDMChannels;
  }
);

export const displayChannel = createAsyncThunk(
  'channel/add',
  async (data: DisplayChannel) => {
    const result = await getOrCreateDMChannel(data);
    ws.emit('CHANNEL_DISPLAY', { channelId: result.data.channel._id });
  }
);

export const selectDMChannels = (state: RootState) => {
  return state.channels.filter((channel) => channel.type === 'DM');
};
export const selectChannelName = (state: RootState) => {
  const foundChannel = state.channels.find(
    (channel) => channel._id === store.getState().ui.activeChannel
  );
  return foundChannel?.name;
};
export const selectChannel = (channelId: string) => {
  return createSelector(
    (state: RootState) => state.channels,
    (channels) =>
      channels.find((e) => e._id === channelId) ??
      ({
        _id: 'Unknown',
        name: 'Unknown',
        dmUser: { avatar: 'unknown' }
      } as Channel)
  );
};
