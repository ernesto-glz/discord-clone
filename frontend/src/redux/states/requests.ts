import { createSelector, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RequestTypes, WS } from '@discord/types';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';
import { actions as api } from './api';

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
  dispatch(api.restCallBegan({
    url: '/requests',
    method: 'post',
    data: payload,
    callback: (request) => {
      const target = request.to;
      dispatch(api.wsCallBegan({
        event: 'FRIEND_REQUEST_CREATE',
        data: { request }
      }));
      events.emit(
        'REQUEST_CREATE_SUCCEEDED',
        `Friend request sent to ${target.username}#${target.discriminator}`
      );
    },
    errorCallback: (error) => {
      const response = error.response;
      if (!response?.data) return;

      const errors = response.data?.errors;
      events.emit('REQUEST_CREATE_FAILED', errors[0]?.message ?? response.data);
    }
  }))
}

export const removeRequest = (requestId: string) => (dispatch: Dispatch) => {
  dispatch(api.restCallBegan({
    onSuccess: [],
    url: `/requests/${requestId}`,
    method: 'delete',
    callback: (request: RequestTypes.Populated) => {
      dispatch(api.wsCallBegan({
        event: 'FRIEND_REQUEST_REMOVE',
        data: { request }
      }));
    }
  }));
};

export const acceptRequest = (request: RequestTypes.Populated) => (dispatch: Dispatch) => {
  dispatch(api.restCallBegan({
    onSuccess: [],
    url: `/requests/${request.id}`,
    method: 'put',
    callback: (data) => dispatch(api.wsCallBegan({
      event: 'FRIEND_REQUEST_ACCEPT',
      data: { request, friendId: data.friendId, channel: data.channel }
    }))
  }));
};

export const getIncomingRequests = () => {
  return createSelector(
    (state: Store.AppState) => state.requests,
    (requests) => requests.filter((r) => r.type === 'INCOMING')
  );
};
