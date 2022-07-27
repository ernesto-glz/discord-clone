import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RequestTypes, WS } from '@discord/types';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';
import { actions as api } from './api';
import events from 'src/services/event-service';

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
    callback: (payload) => {
      const target = payload.to;
      dispatch(actions.added({ ...payload, type: 'OUTGOING' }));
      dispatch(api.wsCallBegan({
        event: 'FRIEND_REQUEST_CREATE',
        data: { request: payload }
      }))
      events.emit(
        'REQUEST_CREATE_SUCCEEDED',
        `Friend request sent to ${target.username}#${target.discriminator}`
      );
    },
    errorCallback: (error) => {
      const errorMessage = error.response?.data?.message ?? 'Unknown error';
      events.emit('REQUEST_CREATE_FAILED', errorMessage);
    }
  }))
}

export const removeRequest = (requestId: string) => (dispatch: Dispatch, getState: () => Store.AppState) => {
  dispatch(api.restCallBegan({
    onSuccess: [],
    url: `/requests/${requestId}`,
    method: 'delete',
    callback: (request: RequestTypes.Populated) => {
      const { from, to } = request;
      const selfId = getState().auth.user!.id;
      const notify = from.id === selfId ? to.id : from.id;

      dispatch(api.wsCallBegan({
        event: 'FRIEND_REQUEST_REMOVE',
        data: { requestId, notify }
      }));
      dispatch(actions.removed({ requestId }));
    }
  }));
};

export const acceptRequest = (requestId: string) => (dispatch: Dispatch) => {
  dispatch(api.restCallBegan({
    onSuccess: [],
    url: `/requests/${requestId}`,
    method: 'put',
    callback: (data) => dispatch(api.wsCallBegan({
      event: 'FRIEND_REQUEST_ACCEPT',
      data: { requestId, friendId: data.friendId, channel: data.channel }
    }))
  }));
};