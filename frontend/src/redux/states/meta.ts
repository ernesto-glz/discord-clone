import { createSlice } from '@reduxjs/toolkit';
import { Store } from 'types/store';

export const metaSlice = createSlice({
  name: 'meta',
  initialState: {
    fetchedEntities: false,
    hasListenedToWS: false
  } as Store.AppState['meta'],
  reducers: {
    listenedToSocket: (state) => {
      state.hasListenedToWS = true;
    },
    fetchedEntities: (state) => {
      state.fetchedEntities = true;
    }
  }
});

export const hasListenedToSocket = (state: Store.AppState) => {
  return state.meta.hasListenedToWS;
};

export const { listenedToSocket, fetchedEntities } = metaSlice.actions;
export default metaSlice.reducer;
