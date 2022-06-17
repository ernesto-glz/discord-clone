import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserFromStorage,
  removeJwt,
  removeUserFromStorage,
  setJwt,
  setUserInStorage
} from 'src/utils/user';
import { RootState } from '../configure-store';

export interface UserState {
  _id: string | null;
  username: string | null;
  email: string | null;
  shortId: string | null;
  avatar: string | null;
  guildIds: string[] | null;
  hiddenDMChannels?: string[] | null;
}

interface LoginPayload {
  user: UserState;
  jwt: string;
}

export const userEmptyState: UserState = {
  _id: null,
  username: null,
  email: null,
  shortId: null,
  avatar: null,
  guildIds: [],
  hiddenDMChannels: []
};
const actualUser: UserState = getUserFromStorage();

export const userSlice = createSlice({
  name: 'user',
  initialState: actualUser || userEmptyState,
  reducers: {
    logIn: (user, action: PayloadAction<LoginPayload>) => {
      setJwt(action.payload.jwt);
      setUserInStorage(action.payload.user);
      user = action.payload.user;
    },
    logOut: () => {
      removeJwt();
      removeUserFromStorage();
      return userEmptyState;
    },
    updated: (user, { payload }) => {
      Object.assign(user, payload);
      setUserInStorage(user);
    }
  }
});

export const selectUser = (state: RootState) => state.user;
export const selectUsername = (state: RootState) => state.user.username;
export const selectAvatar = (state: RootState) => state.user.avatar;
export const selectEmail = (state: RootState) => state.user.email;
export const selectUserId = (state: RootState) => state.user._id;
export const { logIn, logOut } = userSlice.actions;
export const actions = userSlice.actions;
export default userSlice.reducer;
