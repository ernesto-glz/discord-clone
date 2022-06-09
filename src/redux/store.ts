import { configureStore } from '@reduxjs/toolkit';
import userReducer from './states/user';
import notifReducer from './states/notification';
import friendReducer from './states/friend';

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notifReducer,
    friend: friendReducer
  }
});

export default store;
