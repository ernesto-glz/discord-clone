import { createSelector, createSlice } from '@reduxjs/toolkit';
import { getMessages } from 'src/api/message';
import { Message } from 'src/models/message.model';
import { compareDates } from 'src/utils/date';
import { notInArray } from 'src/utils/redux';
import { AppDispatch, RootState } from '../configure-store';

export interface MessageState {
  entities: Message[];
  totalPages: number | null;
  page: number | null;
}

const initialState: MessageState = {
  entities: [],
  totalPages: null,
  page: null
};

export type FetchMessages = { channelId: string; page?: number };

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetched: (messages, { payload }) => {
      messages.entities.unshift(
        ...payload.entities.filter(notInArray(messages.entities))
      );
      messages.totalPages = payload.totalPages;
      messages.page = payload.page;
    },
    created: (messages, { payload }) => {
      const message = payload;
      const prev = messages.entities[messages.entities.length - 1];
      const { sender } = message;

      if (!prev || prev.sender !== sender) {
        messages.entities.push({ ...message });
        return;
      }

      messages.entities.push({
        ...message,
        stackMessage: compareDates(prev.createdAt, message.createdAt)
      });
    }
  }
});

export const actions = messageSlice.actions;
export default messageSlice.reducer;

export const getChannelMessages = (channelId: string) =>
  createSelector(
    (state: RootState) => state.messages.entities,
    (messages) => messages.filter((m) => m.channelId === channelId)
  );

export const fetchMessages =
  ({ channelId, page }: FetchMessages) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { data } = await getMessages(channelId, page);

    if (!data.docs?.length) return [];

    const messagesFound = data.docs
      .reverse()
      .map((message: Message, index: number) => {
        const prev = data.docs[index - 1];
        const { sender } = message;

        if (!prev || prev.sender !== sender) return { ...message };

        return {
          ...message,
          stackMessage: compareDates(prev.createdAt, message.createdAt)
        };
      });

    delete data.docs;
    dispatch(actions.fetched({ ...data, entities: messagesFound }));
  };
