import { createSlice } from '@reduxjs/toolkit';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserInLocalStorage
} from 'src/utils/user';
import { RootState } from '../store';

export interface UserState {
  username: string | null;
  email: string | null;
  shortId: string | null;
  token: string | null;
  avatar: string | null;
}

export const userEmptyState: UserState = {
  username: null,
  email: null,
  shortId: null,
  token: null,
  avatar: null
};
const actualUser: UserState = getUserFromLocalStorage();

export const userSlice = createSlice({
  name: 'user',
  initialState: actualUser || userEmptyState,
  reducers: {
    logIn: (state, action) => {
      setUserInLocalStorage(action.payload);
      state = action.payload;
    },
    logOut: (state) => {
      removeUserFromLocalStorage();
      return userEmptyState;
    }
  }
});

export const selectUser = (state: RootState) => state.user;
export const selectToken = (state: RootState) => state.user.token;
export const selectUsername = (state: RootState) => state.user.username;
export const selectAvatar = (state: RootState) => state.user.avatar;
export const selectEmail = (state: RootState) => state.user.email;
export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
