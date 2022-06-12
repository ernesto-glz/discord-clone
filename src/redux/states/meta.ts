import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../configure-store';

export const metaSlice = createSlice({
  name: 'meta',
  initialState: {
    fetchedEntities: false,
    hasListenedToSocket: false
  },
  reducers: {
    listenedToSocket: (state) => {
      state.hasListenedToSocket = true;
    },
    fetchedEntities: (state) => {
      state.fetchedEntities = true;
    }
  }
});

export const hasListenedToSocket = (state: RootState) => {
  return state.meta.hasListenedToSocket;
};
export const hasFetchedEntities = (state: RootState) => {
  return state.meta.fetchedEntities;
};
export const { listenedToSocket, fetchedEntities } = metaSlice.actions;
export default metaSlice.reducer;
