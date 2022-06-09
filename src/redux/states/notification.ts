import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface NotificationState {
  value: number;
}
export const notificationEmptyState: NotificationState = {
  value: 0
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationEmptyState,
  reducers: {
    setNotifCount: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const selectNotifications = (state: RootState) =>
  state.notifications.value;
export const { setNotifCount } = notificationSlice.actions;
export default notificationSlice.reducer;
