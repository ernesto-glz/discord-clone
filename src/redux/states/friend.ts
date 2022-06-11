import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFriends } from 'src/api/friend';
import { loadAbort } from 'src/utils/load-abort-axios';
import { RootState } from '../store';

export interface FriendStatus {
  userId: string;
  status: 'online' | 'offline';
}

export interface FriendState {
  entities: FriendStatus[];
  loading: 'idle' | 'loading' | 'failed';
}

const initialState: FriendState = {
  entities: [],
  loading: 'idle'
};

export const getAllFriends = createAsyncThunk(
  'friend/getAllFriends',
  async () => {
    const response = await getFriends(loadAbort(), false);
    return response.data.map((entity: FriendStatus) => {
      return { userId: entity.userId, status: 'offline' };
    });
  }
);

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriendOnline: (state, action) => {
      const newState = state.entities.map((entity): FriendStatus => {
        if (entity.userId === action.payload) {
          return { userId: entity.userId, status: 'online' };
        }
        return entity;
      });
      state.entities = newState;
    },
    setFriendOffline: (state, action) => {
      const newState = state.entities.map((entity): FriendStatus => {
        if (entity.userId === action.payload) {
          return { userId: entity.userId, status: 'offline' };
        }
        return entity;
      });
      state.entities = newState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFriends.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getAllFriends.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload;
      })
      .addCase(getAllFriends.rejected, (state) => {
        state.loading = 'failed';
      });
  }
});

export const selectFriends = (state: RootState) => state.friends.entities;
export const isLoadingFriends = (state: RootState) => state.friends.loading;
export const { setFriendOnline, setFriendOffline } = friendSlice.actions;
export default friendSlice.reducer;
