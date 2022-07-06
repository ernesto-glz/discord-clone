import { createSelector, createSlice, Dispatch } from '@reduxjs/toolkit';
import { Entity } from '@discord/types';
import { notInArray } from 'src/utils/redux';
import { Store } from 'types/store';
import { actions as api } from './api';

export interface DisplayChannel {
  userId: string;
}

export type UpdateType = 'VISIBLE' | 'HIDDEN';

export const slice = createSlice({
  name: 'channel',
  initialState: [] as Store.AppState['channels'],
  reducers: {
    fetched: (channels, { payload }) => {
      channels.push(...payload.filter(notInArray(channels)));
    },
    updated: (channels, { payload }) => {
      const channel = channels.find((c) => c._id === payload._id);
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
        data: { channelId: data.channel._id }
      }))
    }
  }))
};

export const getDMChannels = (state: Store.AppState) => {
  return state.channels.filter((channel) => channel.type === 'DM');
};

export const getChannel = (channelId: string) =>
  createSelector(
    (state: Store.AppState) => state.channels,
    (channels) => channels.find((e) => e._id === channelId)
);
