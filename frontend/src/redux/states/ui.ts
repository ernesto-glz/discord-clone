import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configure-store';
import { Channel } from './channels';

export interface UIState {
  activeChannel: Channel | null;
  activeGuild: string | null;
}

export interface PageSwitch {
  channel: Channel | null;
  guild: string | null;
}

export const slice = createSlice({
  name: 'ui',
  initialState: {} as UIState,
  reducers: {
    pageSwitched: (state, { payload }: PayloadAction<PageSwitch>) => {
      state.activeChannel = payload.channel;
      state.activeGuild = payload.guild;
    }
  }
});

export const getActiveChannel = (state: RootState) => state.ui.activeChannel;
export const { pageSwitched } = slice.actions;
export default slice.reducer;
