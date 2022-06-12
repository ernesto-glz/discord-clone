import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDMChannels, getChannelById } from 'src/api/room';
import store, { RootState } from '../configure-store';

export interface Channel {
  _id: string;
  displayName?: string;
  sender: string;
  receiver: string;
}

export interface ChannelState {
  dmChannels: Channel[];
  loading: 'idle' | 'loading' | 'failed';
}

const initialState: ChannelState = {
  dmChannels: [],
  loading: 'idle'
};

export const fetchDMChannels = createAsyncThunk(
  'channel/fetchDMChannels',
  async () => {
    const response = await getDMChannels();
    const { data } = response;
    const myUsername = store.getState().user.username;

    if (!data?.length) return data;

    const DMChannels = await Promise.all(
      data.map(async (channel: any) => {
        const channelInfo = await getChannelById(channel._id);
        const { username: senderUsername } = channelInfo.data.sender;
        const { username: receiverUsername } = channelInfo.data.receiver;
        return {
          ...channel,
          displayName:
            myUsername === senderUsername ? receiverUsername : senderUsername
        };
      })
    );

    return DMChannels;
  }
);

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDMChannels.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchDMChannels.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.dmChannels = action.payload;
      })
      .addCase(fetchDMChannels.rejected, (state) => {
        state.loading = 'failed';
      });
  }
});

export const selectDMChannels = (state: RootState) => {
  return state.channels.dmChannels;
};
export const selectChannelName = (state: RootState) => {
  const foundChannel = state.channels.dmChannels.find(
    (channel) => channel._id === store.getState().ui.activeChannel
  );
  return foundChannel?.displayName;
};
export const isLoadingDMChannels = (state: RootState) => {
  return state.channels.loading;
};
export default channelSlice.reducer;
