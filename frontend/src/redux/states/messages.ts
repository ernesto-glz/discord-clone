import { createSelector, createSlice, Dispatch } from '@reduxjs/toolkit';
import { getMessages } from 'src/api/message';
import { Message } from 'src/models/message.model';
import { isExtraForTime } from 'src/utils/date';
import { notInArray } from 'src/utils/redux';
import { Store } from 'types/store';

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

export const getChannelMessages = (channelId: string) =>
  createSelector(
    (state: Store.AppState) => state.messages.entities,
    (messages) => messages.filter((m) => m.channelId === channelId)
  );

export const fetchMessages =
  ({ channelId, page }: FetchMessages) =>
  async (dispatch: Dispatch, getState: () => Store.AppState) => {
    const { data } = await getMessages(channelId, page);

    if (!data.docs?.length) return [];

    const messagesFound = data.docs.reverse();

    delete data.docs;
    dispatch(actions.fetched({ ...data, entities: messagesFound }));
  };
