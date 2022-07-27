import { createSelector, createSlice, Dispatch } from '@reduxjs/toolkit';
import client from 'src/api/client';
import { CreateMessage } from 'src/models/message.model';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';
import { actions as api } from './api';

export type FetchMessages = { channelId: string; back?: number };

export const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    list: [],
    total: {},
  } as Store.AppState['messages'],
  reducers: {
    fetched: ({ list, total }, { payload }) => {
      list.unshift(...payload.list.filter(notInArray(list)));
      total[payload.channelId] = payload.total;
    },
    created: (messages, { payload: message }) => {
      messages.list.push(message);
    }
  }
});

export const actions = messageSlice.actions;
export default messageSlice.reducer;

export const getChannelMessages = (channelId: string) => createSelector(
  (state: Store.AppState) => state.messages.list,
  (messages) => messages.filter((m) => m.channelId === channelId)
);

export const fetchMessages = ({ channelId, back = 25 }: FetchMessages) => async (dispatch: Dispatch, getState: () => Store.AppState) => {
  const { messages } = getState();
  if (messages.list.length === messages.total[channelId]) return;

  dispatch(api.restCallBegan({
    onSuccess: [actions.fetched.type],
    url: `/channels/${channelId}/messages?back=${back}`,
  }))
};

export const createMessage = (data: CreateMessage) => (dispatch: Dispatch) => {
  dispatch(api.wsCallBegan({
    event: 'MESSAGE_CREATE',
    data
  }));
};