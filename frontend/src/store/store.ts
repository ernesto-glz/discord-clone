import { combineReducers, configureStore, Dispatch } from '@reduxjs/toolkit';
import userReducer from './states/auth';
import metaReducer from './states/meta';
import channelReducer from './states/channels';
import messageReducer from './states/messages';
import uiReducer from './states/ui';
import requestsReducer from './states/requests';
import typingReducer from './states/typing';
import usersReducer from './states/users';

export const store = configureStore({
  reducer: combineReducers({
    auth: userReducer,
    typing: typingReducer,
    channels: channelReducer,
    messages: messageReducer,
    requests: requestsReducer,
    users: usersReducer,
    ui: uiReducer,
    meta: metaReducer,
  }),
});

export type AppState = typeof store.getState;
export type AppDispatch = Dispatch<any>;
