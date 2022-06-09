import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FriendState {
  userId: string;
  status: 'online' | 'offline';
}

export const friendEmptyState: FriendState[] = [];

export const friendSlice = createSlice({
  name: 'friend',
  initialState: friendEmptyState,
  reducers: {
    setFriends: (state, action) => {
      state = action.payload;
    }
  }
});

export const selectFriends = (state: RootState) => state.friends;
export const { setFriends } = friendSlice.actions;
export default friendSlice.reducer;
