import { configureStore } from '@reduxjs/toolkit';
import userReducer from './states/user';
import notifReducer from './states/notification';

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notifReducer
  }
});

export default store;
