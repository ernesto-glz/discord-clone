import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserFromStorage,
  removeJwt,
  removeUserFromStorage,
  setJwt,
  setUserInStorage
} from 'src/utils/user';
import { RootState } from '../store';

export interface UserState {
  username: string | null;
  email: string | null;
  shortId: string | null;
  avatar: string | null;
}

interface LoginPayload {
  user: UserState;
  jwt: string;
}

export const userEmptyState: UserState = {
  username: null,
  email: null,
  shortId: null,
  avatar: null
};
const actualUser: UserState = getUserFromStorage();

export const userSlice = createSlice({
  name: 'user',
  initialState: actualUser || userEmptyState,
  reducers: {
    logIn: (state, action: PayloadAction<LoginPayload>) => {
      setJwt(action.payload.jwt);
      setUserInStorage(action.payload.user);
      state = action.payload.user;
    },
    logOut: (state) => {
      removeJwt();
      removeUserFromStorage();
      return userEmptyState;
    }
  }
});

export const selectUser = (state: RootState) => state.user;
export const selectUsername = (state: RootState) => state.user.username;
export const selectAvatar = (state: RootState) => state.user.avatar;
export const selectEmail = (state: RootState) => state.user.email;
export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
