import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserFromStorage,
  removeJwt,
  removeUserFromStorage,
  setJwt,
  setUserInStorage
} from 'src/utils/user';

export interface UserState {
  _id: string | null;
  username: string | null;
  email: string | null;
  shortId: string | null;
  avatar: string | null;
  guildIds: string[] | null;
  hiddenDMChannels?: string[] | null;
  lastReadMessageIds: { [k: string]: string };
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
  hiddenDMChannels: [],
  lastReadMessageIds: {}
};
const actualUser: UserState = getUserFromStorage();

export const slice = createSlice({
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

export const { logIn, logOut } = slice.actions;
export const actions = slice.actions;
export default slice.reducer;
