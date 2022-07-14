import { createSelector, createSlice } from '@reduxjs/toolkit';
import { notInArray } from 'src/utils/utils';
import { Store } from 'types/store';

export const slice = createSlice({
  name: 'users',
  initialState: [] as Store.AppState['users'],
  reducers: {
    fetched: (users, { payload }) => {
      users.push(...payload.filter(notInArray(users)));
    },
    updated: (users, { payload }) => {
      const user = users.find((e) => e.id === payload.userId);
      if (user) Object.assign(user, payload.user);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const getUserById = (userId: string) => {
  return createSelector(
    (state: Store.AppState) => state.users,
    (users) => users.find((u) => u.id === userId)
  )
}

export const getFriendUsers = () => {
  return createSelector(
    (state: Store.AppState) => state,
    (state) => state.users.filter((u) => state.auth.user!.friendIds.includes(u.id))
  )
}