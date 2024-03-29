import { Entity, WS } from '@discord/types';
import { createSelector, createSlice, Dispatch } from '@reduxjs/toolkit';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';

export type FetchMessages = { channelId: string; back?: number };

export const slice = createSlice({
  name: 'messages',
  initialState: {
    list: [],
    total: {},
  } as Store.AppState['messages'],
  reducers: {
    fetched: (messages, { payload }) => {
      messages.list.unshift(...payload.list.filter(notInArray(messages.list)));
      messages.total[payload.channelId] = payload.total;
    },
    created: ({ list, total }, { payload: message }) => {
      list.push(message);
      total[message.channelId] += 1;
    },
    updated: ({ list }, { payload }) => {
      const message = list.find(m => m.id === payload.messageId) as Entity.Message;
      Object.assign(message, payload.partialMessage);
    },
    deleted: ({ list, total }, { payload }) => {
      const index = list.findIndex(m => m.id === payload.messageId);
      list.splice(index, 1);
      total[payload.channelId] -= 1;
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const getChannelMessages = (channelId: string) => createSelector(
  (state: Store.AppState) => state.messages.list,
  (messages) => messages.filter((m) => m.channelId === channelId)
);

export const fetchMessages = ({ channelId, back = 25 }: FetchMessages) => async (dispatch: Dispatch, getState: () => Store.AppState) => {
  const { messages } = getState();
  if (messages.list.length === messages.total[channelId]) return;

  restClient.call({
    url: `/channels/${channelId}/messages?back=${back}`,
    callback: (data) => dispatch(actions.fetched(data))
  })
};

export const createMessage = (data: any) => {
  wsClient.call({
    event: 'MESSAGE_CREATE',
    data
  });
};

export const updateMessage = (id: string, payload: Partial<Entity.Message>) => {
  wsClient.call({
    event: 'MESSAGE_UPDATE',
    data: { messageId: id, ...payload },
  });
}

export const deleteMessage = (params: WS.Params.MessageDelete) => {
  const callback = () => {
    wsClient.call({
      event: 'MESSAGE_DELETE',
      data: params
    })
  }

  restClient.call({
    url: `/channels/${params.channelId}/messages/${params.messageId}`,
    method: 'delete',
    callback
  })
}
