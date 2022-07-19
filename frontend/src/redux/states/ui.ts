import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity } from '@discord/types'
import { Store } from 'types/store';

export interface PageSwitch {
  channel: Entity.Channel | null;
  guild: string | null;
}

export const slice = createSlice({
  name: 'ui',
  initialState: {} as Store.AppState['ui'],
  reducers: {
    pageSwitched: (state, { payload }: PayloadAction<PageSwitch>) => {
      state.activeChannel = payload.channel;
      state.activeGuild = payload.guild;
    },
    openedModal: (state, { payload }) => {      
      state.openModal = payload;
    },
    closedModal: (state) => {
      delete state.openModal;
    },
  }
});

export const actions = slice.actions;
export default slice.reducer;
