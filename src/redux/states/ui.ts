import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../configure-store';

export const slice = createSlice({
  name: 'ui',
  initialState: {
    activeChannel: ''
  },
  reducers: {
    pageSwitched: (state, action) => {
      state.activeChannel = action.payload;
    }
  }
});

export const selectActiveChannel = (state: RootState) => state.ui.activeChannel;
export const { pageSwitched } = slice.actions;
export default slice.reducer;
