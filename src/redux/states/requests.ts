import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    addIncomingRequest: (requests, action) => {
      requests.incoming.entities.push(action.payload);
    },
    addOutGoingRequest: (requests, action) => {
      requests.outgoing.entities.push(action.payload);
    },
    removeIncomingRequest: (requests, action) => {
      requests.incoming.entities = requests.incoming.entities.filter(
        (request) => request._id !== action.payload
      );
    },
    removeOutgoingRequest: (requests, action) => {
      requests.outgoing.entities = requests.outgoing.entities.filter(
        (request) => request._id !== action.payload
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
export const {
  addIncomingRequest,
  addOutGoingRequest,
  removeIncomingRequest,
  removeOutgoingRequest
} = slice.actions;
export default slice.reducer;
