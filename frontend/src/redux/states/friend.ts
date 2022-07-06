import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notInArray } from 'src/utils/redux';
import { Entity } from '@discord/types';

export const slice = createSlice({
  name: 'friend',
  initialState: [] as Entity.User[],
  reducers: {
    fetched: (friends, { payload }: PayloadAction<Entity.User[]>) => {
      friends.push(...payload.filter(notInArray(friends)));
    },
    addFriend: (friends, { payload}) => {
      friends.push(payload);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;
