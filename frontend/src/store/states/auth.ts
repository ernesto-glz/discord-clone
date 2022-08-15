import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { UserTypes } from '@discord/types';
import { Store } from 'types/store';
import { token } from 'src/utils/utils';
import { AppDispatch } from '../store';

export interface AuthState {
  user?: UserTypes.Self;
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
      Object.assign(auth.user as unknown as object, payload as unknown as object);
    }
  }
});

export const actions = slice.actions;
export default slice.reducer;

export const ready = () => (dispatch: Dispatch, getState: () => Store.AppState) => {
  if (getState().auth.user || !token()) return;

  wsClient.call({
    event: 'READY',
    data: { token: token() },
  });
};

export const loginUser = (credentials: Credentials) => (dispatch: AppDispatch) => {
  const callback = (payload) => {
    if (!payload.token) return;
    localStorage.setItem('access_token', payload.token);
    dispatch(ready());
  }

  restClient.call({
    url: '/auth/login',
    method: 'post',
    data: credentials,
    callback,
    errorEvent: 'LOGIN_FAILED'
  });
}

export const registerUser = (payload: any) => (dispatch: AppDispatch) => {
  const callback = (data) => {
    localStorage.setItem('access_token', data.token);
    dispatch(ready());
  }

  restClient.call({
    url: '/auth/register',
    method: 'post',
    data: payload,
    callback,
    errorEvent: 'REGISTER_FAILED'
  });
}

export const logoutUser = () => (dispatch: Dispatch) => {
  dispatch(actions.loggedOut());
  localStorage.removeItem('access_token');
  window.location.assign('/login');
};

export const changeUsername = (payload: any) => (dispatch: Dispatch) => {
  const callback = (data) => {
    wsClient.call({
      event: 'USER_UPDATE',
      data: { ...data, token: token() }
    });
    events.emit('CHANGE_USERNAME_SUCCEEDED');
  }

  restClient.call({
    url: '/auth/change-username',
    method: 'patch',
    data: payload,
    callback,
    errorEvent: 'CHANGE_USERNAME_FAILED'
  });
};

export const changePassword = (payload: any) => (dispatch: Dispatch) => {
  const callback = () => events.emit('CHANGE_PASSWORD_SUCCEEDED');

  restClient.call({
    url: '/auth/change-password',
    method: 'patch',
    data: payload,
    callback,
    errorEvent: 'CHANGE_PASSWORD_FAILED'
  });
};

export const deleteAccount = (payload: any) => (dispatch: AppDispatch) => {
  const callback = (data) => {
    wsClient.call({
      event: 'USER_UPDATE',
      data: { ...data, token: token() }
    });
    dispatch(logoutUser());
  }

  restClient.call({
    url: '/users',
    method: 'delete',
    data: payload,
    callback,
    errorEvent: 'ACCOUNT_DELETE_FAILED'
  });
};
