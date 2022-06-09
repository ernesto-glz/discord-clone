import { createSlice } from '@reduxjs/toolkit';

export const friendEmptyState = 0;

export const friendSlice = createSlice({
  name: 'friend',
  initialState: friendEmptyState,
  reducers: {
    setFriends: (state, action) => action.payload
  }
});

export const { setFriends } = friendSlice.actions;
export default friendSlice.reducer;
