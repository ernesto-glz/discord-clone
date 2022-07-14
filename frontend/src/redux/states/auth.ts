import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { WS, Entity } from '@discord/types';
import { Store } from 'types/store';
import { actions as api } from './api';
import { actions as meta } from './meta';
import { resetWS } from 'src/ws/websocket';
import events from 'src/services/event-service';
import { token } from 'src/utils/utils';

export interface AuthState {
  user?: Entity.UserTypes.Self;
  attemptedLogin: boolean;
}

export interface Credentials {
  email: string;
  password: string;
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
    loggedIn: (auth) => { auth.attemptedLogin = true },
    loggedOut: (auth) => {
      delete auth.user;
      auth.attemptedLogin = false;
    },
    updatedUser: (auth, { payload }) => {
      Object.assign(auth.user, payload);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const ready = () => (dispatch: Dispatch, getState: () => Store.AppState) => {
  if (getState().auth.user || !token()) return;

  dispatch(api.wsCallBegan({
    event: 'READY',
    data: { jwt: token() } as WS.Params.Ready,
  }));
};

export const loginUser = (credentials: Credentials) => (dispatch: Dispatch<any>) => {
  dispatch(api.restCallBegan({
    url: '/auth/login',
    method: 'post',
    data: credentials,
    callback: (payload) => {
      if (payload.token) {
        localStorage.setItem('access_token', payload.token);
        dispatch(ready());
      }
    },
    errorCallback: (error: any) => {
      const response = error.response;
      if (!response?.data) return;
      
      const errors = response.data?.errors;
      events.emit('LOGIN_FAILED', errors ?? [{ msg: response.data }]);
    }
  }));
}

export const registerUser = (payload: any) => (dispatch: Dispatch<any>) => {
  dispatch(api.restCallBegan({
    url: '/auth/register',
    method: 'post',
    data: payload,
    callback: (payload) => {
      localStorage.setItem('access_token', payload.token);
      dispatch(ready());
    },
    errorCallback: (error: any) => {
      const response = error.response;
      if (!response?.data) return;
      
      const errors = response.data?.errors;
      events.emit('REGISTER_FAILED', errors ?? [{ msg: response.data }]);
    }
  }));
}

export const logoutUser = () => (dispatch: Dispatch) => {
  dispatch(actions.loggedOut());
  dispatch(meta.reseted());
  localStorage.removeItem('access_token');
  resetWS();
};