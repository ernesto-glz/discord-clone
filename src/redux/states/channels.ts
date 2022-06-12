import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDMChannels } from 'src/api/room';
import { RootState } from '../configure-store';

export interface ChannelState {
  dmChannels: object[];
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
    return response.data;
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
export default channelSlice.reducer;
