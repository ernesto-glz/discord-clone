import { createSelector, createSlice, Dispatch } from '@reduxjs/toolkit';
import client from 'src/api/client';
import { CreateMessage } from 'src/models/message.model';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';
import { actions as api } from './api';

export type FetchMessages = { channelId: string; page?: number };

export const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    entities: [],
    totalPages: null,
    page: null
  } as Store.AppState['messages'],
  reducers: {
    fetched: (messages, { payload }) => {
      messages.entities.unshift(
        ...payload.entities.filter(notInArray(messages.entities))
      );
      messages.totalPages = payload.totalPages;
      messages.page = payload.page;
    },
    created: (messages, { payload: message }) => {
      messages.entities.push(message);
    }
  }
});

export const actions = messageSlice.actions;
export default messageSlice.reducer;

export const getChannelMessages = (channelId: string) => createSelector(
  (state: Store.AppState) => state.messages.entities,
  (messages) => messages.filter((m) => m.channelId === channelId)
);

export const fetchMessages = ({ channelId, page }: FetchMessages) => async (dispatch: Dispatch) => {
  const { data } = await client.get(`/channels/${channelId}/messages?page=${page ?? 1}`);

  if (!data.docs?.length) return [];

  const messagesFound = data.docs.reverse();

  delete data.docs;
  dispatch(actions.fetched({ ...data, entities: messagesFound }));
};

export const createMessage = (data: CreateMessage) => (dispatch: Dispatch) => {
  dispatch(api.wsCallBegan({
    event: 'MESSAGE_CREATE',
    data
  }));
};