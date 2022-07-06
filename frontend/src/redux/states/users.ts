import { createSelector, createSlice, current } from '@reduxjs/toolkit';
import { notInArray } from 'src/utils/redux';
import { Store } from 'types/store';

export const slice = createSlice({
  name: 'users',
  initialState: [] as Store.AppState['users'],
  reducers: {
    fetched: (users, { payload }) => {
      users.push(...payload.filter(notInArray(users)));
    },
    updated: (users, { payload }) => {
      const user = users.find((e) => e._id === payload.userId);
      if (user) Object.assign(user, payload.user);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const getUserById = (userId: string) => {
  return createSelector(
    (state: Store.AppState) => state.users,
    (users) => users.find((u) => u._id === userId)
  )
}

export const getFriendUsers = () => {
  return createSelector(
    (state: Store.AppState) => state,
    (state) => state.users.filter((u) => state.friends.includes(u._id))
  )
}