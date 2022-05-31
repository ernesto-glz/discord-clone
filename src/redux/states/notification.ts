import { createSlice } from '@reduxjs/toolkit';

export const notificationEmptyState = 0;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationEmptyState,
  reducers: {
    setNotifCount: (state, action) => action.payload
  }
});

export const { setNotifCount } = notificationSlice.actions;
export default notificationSlice.reducer;
