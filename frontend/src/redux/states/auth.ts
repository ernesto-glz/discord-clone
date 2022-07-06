import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { getJwt, removeJwt, setJwt } from 'src/utils/user';
import { WS, Entity } from '@discord/types';
import { Store } from 'types/store';
import { actions as api } from './api'
import { ws } from 'src/ws/websocket';

export interface AuthState {
  user?: Entity.UserTypes.Self;
  attemptedLogin: boolean;
}

export const slice = createSlice({
  name: 'auth',
  initialState: {
    attemptedLogin: false
  } as AuthState,
  reducers: {
    ready: (auth, { payload }) => {
      auth.user = payload;
      auth.attemptedLogin = true;
    },
    logIn: (auth, { payload }) => {
      setJwt(payload.jwt);
      ws.connect();
      auth.user = payload.user;
    },
    logOut: (auth) => {
      removeJwt();
      delete auth.user;
      ws.disconnect();
      auth.attemptedLogin = false;
    },
    updated: (auth, { payload }) => {
      Object.assign(auth.user, payload);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const ready = () => (dispatch: Dispatch, getState: () => Store.AppState) => {
  if (getState().auth.user || !getJwt()) return;

  dispatch(api.wsCallBegan({
    event: 'READY',
    data: { jwt: getJwt() } as WS.Params.Ready,
  }));
}