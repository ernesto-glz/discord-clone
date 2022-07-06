import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity, WS } from '@discord/types';
import { notInArray } from 'src/utils/redux';
import { Store } from 'types/store';

export const slice = createSlice({
  name: 'requests',
  initialState: {
    incoming: {
      entities: []
    },
    outgoing: {
      entities: []
    }
  } as Store.AppState['requests'],
  reducers: {
    fetchedIncoming: (requests, { payload }) => {
      requests.incoming.entities.push(...payload.filter(notInArray(requests.incoming.entities)));
    },
    fetchedOutgoing: (requests, { payload }) => {
      requests.outgoing.entities.push(...payload.filter(notInArray(requests.outgoing.entities)));
    },
    addRequest: (requests, { payload }: PayloadAction<WS.Args.RequestCreate>) => {
      payload.type === 'INCOMING'
        ? requests.incoming.entities.push(payload.request)
        : requests.outgoing.entities.push(payload.request);
    },
    removeRequest: (requests, { payload }: PayloadAction<WS.Args.RequestRemove>) => {
      if (payload.type === 'INCOMING') {
        requests.incoming.entities = requests.incoming.entities.filter(
          (request) => request._id !== payload.request._id
        );
        return;
      }
      requests.outgoing.entities = requests.outgoing.entities.filter(
        (request) => request._id !== payload.request._id
      );
    }
  }
});

export const selectIncoming = (state: Store.AppState): Entity.Request[] => {
  return state.requests.incoming.entities;
};

export const selectOutgoing = (state: Store.AppState): Entity.Request[] => {
  return state.requests.outgoing.entities;
};

export const actions = slice.actions;
export default slice.reducer;