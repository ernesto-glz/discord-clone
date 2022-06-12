import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const metaSlice = createSlice({
  name: 'meta',
  initialState: {
    hasListenedToSocket: false
  },
  reducers: {
    listenedToSocket: (state) => {
      state.hasListenedToSocket = true;
    }
  }
});

export const hasListenedToSocket = (state: RootState) => {
  return state.meta.hasListenedToSocket;
};
export const { listenedToSocket } = metaSlice.actions;
export default metaSlice.reducer;
