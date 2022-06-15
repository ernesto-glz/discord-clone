import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOutgoingRequests, getPendingRequests } from 'src/api/friend';
import { FriendRequest } from 'src/models/friend.model';
import { loadAbort } from 'src/utils/load-abort-axios';
import { RootState } from '../configure-store';

export interface FriendRequests {
  incoming: {
    entities: FriendRequest[];
    loading: 'idle' | 'loading' | 'failed';
  };
  outgoing: {
    entities: FriendRequest[];
    loading: 'idle' | 'loading' | 'failed';
  };
}

export interface CreateReqPayload {
  request: FriendRequest;
  type: 'INCOMING' | 'OUTGOING';
}

export interface RemoveReqPayload {
  requestId: string;
  type: 'INCOMING' | 'OUTGOING';
}

export const initialState: FriendRequests = {
  incoming: {
    entities: [],
    loading: 'idle'
  },
  outgoing: {
    entities: [],
    loading: 'idle'
  }
};

export const getIncoming = createAsyncThunk(
  'requests/getIncoming',
  async () => {
    const response = await getPendingRequests(loadAbort());
    return response.data;
  }
);

export const getOutgoing = createAsyncThunk(
  'requests/getOutgoing',
  async () => {
    const response = await getOutgoingRequests(loadAbort());
    return response.data;
  }
);

export const slice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (requests, { payload }: PayloadAction<CreateReqPayload>) => {
      payload.type === 'INCOMING'
        ? requests.incoming.entities.push(payload.request)
        : requests.outgoing.entities.push(payload.request);
    },
    removeRequest: (requests, { payload }: PayloadAction<RemoveReqPayload>) => {
      if (payload.type === 'INCOMING') {
        requests.incoming.entities = requests.incoming.entities.filter(
          (request) => request._id !== payload.requestId
        );
        return;
      }
      requests.outgoing.entities = requests.outgoing.entities.filter(
        (request) => request._id !== payload.requestId
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncoming.pending, (requests) => {
        requests.incoming.loading = 'loading';
      })
      .addCase(getIncoming.fulfilled, (requests, action) => {
        requests.incoming.loading = 'idle';
        requests.incoming.entities = action.payload;
      })
      .addCase(getIncoming.rejected, (requests) => {
        requests.incoming.loading = 'failed';
      });
    builder
      .addCase(getOutgoing.pending, (requests) => {
        requests.outgoing.loading = 'loading';
      })
      .addCase(getOutgoing.fulfilled, (requests, action) => {
        requests.outgoing.loading = 'idle';
        requests.outgoing.entities = action.payload;
      })
      .addCase(getOutgoing.rejected, (requests) => {
        requests.outgoing.loading = 'failed';
      });
  }
});

export const selectIncoming = (state: RootState) => {
  return state.requests.incoming.entities;
};
export const selectOutgoing = (state: RootState) => {
  return state.requests.outgoing.entities;
};
export const actions = slice.actions;
export default slice.reducer;
