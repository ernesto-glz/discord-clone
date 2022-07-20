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
    pageSwitched: (ui, { payload }: PayloadAction<PageSwitch>) => {
      ui.activeChannel = payload.channel;
      ui.activeGuild = payload.guild;
    },
    openedModal: (ui, { payload }) => {
      ui.openModals ??= [];      
      ui.openModals.push(payload);
    },
    closedModal: (ui, { payload }) => {
      const index = ui.openModals?.indexOf(payload);
      if (typeof index === 'undefined' || index === -1) return;
      ui.openModals?.splice(index, 1);
    },
    closedLastModal: (ui) => {
      ui.openModals?.pop();
    },
    closedAllModals: (ui) => {
      ui.openModals = [];
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;
