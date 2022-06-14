import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrCreateChannel, getChannels } from 'src/api/channel';
import { ws } from 'src/contexts/ws.context';
import { User } from 'src/models/user.model';
import { notInArray } from 'src/utils/redux';
import store, { RootState } from '../configure-store';

export interface Channel {
  _id: string;
  name: string;
  guildId: string;
  userIds: User[];
  dmUser?: User;
}

export interface AddChannel {
  userId: string;
  guildId: string | 'DM';
}

export const slice = createSlice({
  name: 'channel',
  initialState: [] as Channel[],
  reducers: {
    created: (
      channels,
      { payload }: PayloadAction<{ channel: Channel; myId?: string }>
    ) => {
      if (payload.channel.guildId !== 'DM') {
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
      if (c.guildId === 'DM') {
        const dmUser = c.userIds[0]._id === myId ? c.userIds[1] : c.userIds[0];
        return { ...c, name: dmUser.username, dmUser };
      }
      return { ...c };
    });

    return withDMChannels;
  }
);

export const addChannel = createAsyncThunk(
  'channel/add',
  async (data: AddChannel) => {
    const myId = store.getState().user._id;
    const result = await getOrCreateChannel(data);
    if (result.data.alreadyExists)
      ws.emit('CHANNEL_GO', { channel: result.data.channel, userId: myId });
    else ws.emit('CHANNEL_CREATE', result.data.channel);
  }
);

export const selectDMChannels = (state: RootState) => {
  return state.channels.filter((channel) => channel.guildId === 'DM');
};
export const selectChannelName = (state: RootState) => {
  const foundChannel = state.channels.find(
    (channel) => channel._id === store.getState().ui.activeChannel
  );
  return foundChannel?.name;
};
