import { createSelector, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RequestTypes, WS } from '@discord/types';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';

export const slice = createSlice({
  name: 'requests',
  initialState: [] as Store.AppState['requests'],
  reducers: {
    fetched: (requests, { payload }) => {
      requests.push(...payload.filter(notInArray(requests)));
    },
    added: (requests, { payload }: PayloadAction<RequestTypes.Populated>) => {
      requests.push(payload)
    },
    removed: (requests, { payload }: PayloadAction<WS.Args.RequestRemove>) => {
      const index = requests.findIndex((r) => r.id === payload.requestId)
      requests.splice(index, 1);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const createRequest = (payload: any) => (dispatch: Dispatch) => {
  const callback = (request) => {
    const target = request.to;
    wsClient.call({
      event: 'FRIEND_REQUEST_CREATE',
      data: { request }
    });
    events.emit(
      'REQUEST_CREATE_SUCCEEDED',
      `Friend request sent to ${target.username}#${target.discriminator}`
    );
  }

  restClient.call({
    url: '/requests',
    method: 'post',
    data: payload,
    callback,
    errorEvent: 'REQUEST_CREATE_FAILED'
  });
}

export const removeRequest = (requestId: string) => (dispatch: Dispatch) => {
  const callback = (request: RequestTypes.Populated) => {
    wsClient.call({
      event: 'FRIEND_REQUEST_REMOVE',
      data: { request }
    });
  }

  restClient.call({
    url: `/requests/${requestId}`,
    method: 'delete',
    callback
  });
};

export const acceptRequest = (request: RequestTypes.Populated) => (dispatch: Dispatch) => {
  const callback = (data) => {
    wsClient.call({
      event: 'FRIEND_REQUEST_ACCEPT',
      data: { request, friendId: data.friendId, channel: data.channel }
    });
  }

  restClient.call({
    url: `/requests/${request.id}`,
    method: 'put',
    callback
  });
};

export const getIncomingRequests = () => {
  return createSelector(
    (state: Store.AppState) => state.requests,
    (requests) => requests.filter((r) => r.type === 'INCOMING')
  );
};
