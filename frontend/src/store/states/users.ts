import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notInArray, token } from 'src/utils/utils';
import { Store } from 'types/store';
import { UserTypes, WS } from '@discord/types';

export const slice = createSlice({
  name: 'users',
  initialState: [] as Store.AppState['users'],
  reducers: {
    fetched: (users, { payload }) => {
      users.push(...payload.filter(notInArray(users)));
    },
    updated: (users, { payload }: PayloadAction<WS.Args.UserUpdate>) => {
      const user = users.find((e) => e.id === payload.userId);
      if (user) Object.assign(user, payload.partialUser);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const getUserById = (userId: string) => {
  return createSelector(
    (state: Store.AppState) => state.users,
    (users) => users.find((u) => u.id === userId)
  );
};

export const getFriendUsers = () => {
  return createSelector(
    (state: Store.AppState) => state,
    (state) => state.users.filter((u) => state.auth.user!.friendIds.includes(u.id))
  );
};

export const updateSelf = (payload: Partial<UserTypes.Self>) => (dispatch) => {
  wsClient.call({
    event: 'USER_UPDATE',
    data: { partialUser: { ...payload }, token: token() },
  });
}

export const uploadUserAvatar = (file: File) => (dispatch) => {
  const uploadCallback = async ({ url }) => dispatch(updateSelf({ avatar: url }));
  restClient.uploadFile(file, uploadCallback);
}
