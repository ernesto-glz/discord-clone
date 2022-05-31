import { createSlice } from '@reduxjs/toolkit';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserInLocalStorage
} from 'src/utils/user';

export const userEmptyState = {
  username: null,
  shortId: null,
  email: null,
  token: null,
  avatar: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromLocalStorage() || userEmptyState,
  reducers: {
    logIn: (state, action) => {
      setUserInLocalStorage(action.payload);
      return action.payload;
    },
    logOut: () => {
      removeUserFromLocalStorage();
      return userEmptyState;
    }
  }
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
