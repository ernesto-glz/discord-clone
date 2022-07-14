import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './states/auth';
import metaReducer from './states/meta';
import channelReducer from './states/channels';
import messageReducer from './states/messages';
import uiReducer from './states/ui';
import requestsReducer from './states/requests';
import typingReducer from './states/typing';
import usersReducer from './states/users';
import api from './middleware/rest';
import ws from './middleware/ws';

export const store = configureStore({
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    api,
    ws,
  ] as any,
  reducer: combineReducers({
    auth: userReducer,
    typing: typingReducer,
    channels: channelReducer,
    messages: messageReducer,
    requests: requestsReducer,
    users: usersReducer,
    ui: uiReducer,
    meta: metaReducer,
  })
});