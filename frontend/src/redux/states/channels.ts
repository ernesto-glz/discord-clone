import { createSelector, createSlice, Dispatch } from '@reduxjs/toolkit';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';
import { actions as api } from './api';

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
  dispatch(api.restCallBegan({
    onSuccess: [],
    url: '/channels',
    data: { userId },
    method: 'post',
    callback: (data) => {
      dispatch( api.wsCallBegan({
        event: 'CHANNEL_DISPLAY',
        data: { channelId: data.channel.id }
      }))
    }
  }))
};

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
