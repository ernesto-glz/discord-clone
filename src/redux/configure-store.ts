import { configureStore } from '@reduxjs/toolkit';
import userReducer from './states/user';
import notifReducer from './states/notification';
import friendReducer from './states/friend';
import metaReducer from './states/meta';

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notifReducer,
    friends: friendReducer,
    meta: metaReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
