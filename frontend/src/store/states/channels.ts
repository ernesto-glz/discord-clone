import { createSelector, createSlice, Dispatch } from '@reduxjs/toolkit';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';

export const slice = createSlice({
  name: 'channels',
  initialState: [] as Store.AppState['channels'],
  reducers: {
    fetched: (channels, { payload }) => {
      channels.push(...payload.filter(notInArray(channels)));
    },
    updated: (channels, { payload }) => {
      const channel = channels.find((c) => c.id === payload.id);
      if (!channel) return;
      Object.assign(channel, payload);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const displayChannel = (userId: string) => (dispatch: Dispatch) => {
  const callback = (data) => {
    wsClient.call({
      event: 'CHANNEL_DISPLAY',
      data: { channelId: data.channel.id }
    });
  };
  restClient.call({
    url: '/channels',
    method: 'post',
    data: { userId },
    callback
  });
};

export const hideChannel = (channelId: string) => (dispatch: Dispatch) => {
  wsClient.call({
    event: 'CHANNEL_HIDE',
    data: { channelId }
  });
}

export const getDMChannels = () => {
  return createSelector(
    (state: Store.AppState) => state,
    (state) => {
      const { channels, auth } = state;
      return auth.user!.activeDMCS.map((channelId) => channels.find((c) => c.id === channelId)!);
    }
  );
}

export const getChannel = (channelId: string) =>
  createSelector(
    (state: Store.AppState) => state.channels,
    (channels) => channels.find((e) => e.id === channelId)
);
