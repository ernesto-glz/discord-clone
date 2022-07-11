import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WS } from '@discord/types';
import { notInArray } from 'src/utils/redux';
import { Store } from 'types/store';

export const slice = createSlice({
  name: 'requests',
  initialState: [] as Store.AppState['requests'],
  reducers: {
    fetched: (requests, { payload }) => {
      requests.push(...payload.filter(notInArray(requests)));
    },
    addRequest: (requests, { payload }: PayloadAction<WS.Args.RequestCreate>) => {
      requests.push(payload.request)
    },
    removeRequest: (requests, { payload }: PayloadAction<WS.Args.RequestRemove>) => {
      const index = requests.findIndex((r) => r.id === payload.requestId)
      requests.splice(index, 1);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;