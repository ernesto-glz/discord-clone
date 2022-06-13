import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFriends } from 'src/api/friend';
import { User } from 'src/models/user.model';
import { loadAbort } from 'src/utils/load-abort-axios';
import { RootState } from '../configure-store';

export interface FriendState {
  entities: User[];
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
    return response.data;
  }
);

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.entities.push(action.payload);
    },
    setFriendOnline: (state, action) => {
      const newState = state.entities.map((entity): User => {
        if (entity._id === action.payload) {
          return { ...entity, status: 'ONLINE' };
        }
        return entity;
      });
      state.entities = newState;
    },
    setFriendOffline: (state, action) => {
      const newState = state.entities.map((entity): User => {
        if (entity._id === action.payload) {
          return { ...entity, status: 'OFFLINE' };
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
export const actions = friendSlice.actions;
export default friendSlice.reducer;
