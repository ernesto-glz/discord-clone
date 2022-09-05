import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity } from '@discord/types';
import { Store } from 'types/store';

export interface PageSwitch {
  channel: Entity.Channel | null;
  guild: string | null;
}

export const slice = createSlice({
  name: 'ui',
  initialState: {
    friendsSection: 'ONLINE',
    lastScrollbarPos: {},
    deleteMessageTarget: {},
  } as Store.AppState['ui'],
  reducers: {
    pageSwitched: (ui, { payload }: PayloadAction<PageSwitch>) => {
      ui.activeChannel = payload.channel;
      ui.activeGuild = payload.guild;
    },
    openedModal: (ui, { payload }) => {
      ui.openModals ??= [];
      if (ui.openModals.includes(payload)) return;
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
    },
    sectionSwitched: (ui, { payload }) => {
      ui.friendsSection = payload;
    },
    startedEditingMessage: (state, { payload }) => {
      state.editingMessageId = payload;
    },
    stoppedEditingMessage: (state) => {
      delete state.editingMessageId;
    },
    setLastScrollbarPos: (state, { payload }) => {
      state.lastScrollbarPos[payload.channelId] = payload.position;
    },
    setDeleteMessageTarget: (state, { payload }) => {
      state.deleteMessageTarget = payload;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
