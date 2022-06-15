import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configure-store';

export interface UIState {
  activeChannel: string;
  activeGuild: string;
}

export interface PageSwitch {
  channel: string;
  guild: string;
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

export const selectActiveChannel = (state: RootState) => state.ui.activeChannel;
export const { pageSwitched } = slice.actions;
export default slice.reducer;
