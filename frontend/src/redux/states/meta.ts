import { createSlice } from '@reduxjs/toolkit';
import { Store } from 'types/store';

export const slice = createSlice({
  name: 'meta',
  initialState: {
    fetchedEntities: false,
    hasListenedToWS: false
  } as Store.AppState['meta'],
  reducers: {
    listenedToWS: (meta) => {
      meta.hasListenedToWS = true;
    },
    fetchedEntities: (meta) => {
      meta.fetchedEntities = true;
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;
