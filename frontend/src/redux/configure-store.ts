import { configureStore } from '@reduxjs/toolkit';
import userReducer from './states/user';
import pingsReducer from './states/pings';
import friendReducer from './states/friend';
import metaReducer from './states/meta';
import channelReducer from './states/channels';
import messageReducer from './states/messages';
import uiReducer from './states/ui';
import requestsReducer from './states/requests';

const store = configureStore({
  reducer: {
    user: userReducer,
    pings: pingsReducer,
    friends: friendReducer,
    meta: metaReducer,
    channels: channelReducer,
    messages: messageReducer,
    ui: uiReducer,
    requests: requestsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
