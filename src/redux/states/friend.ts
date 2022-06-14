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
    updatePresence: (state, { payload }) => {
      const user = state.entities.find((e) => e._id === payload.userId);
      if (user) Object.assign(user, payload.user);
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
