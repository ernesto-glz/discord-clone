import { actions } from '../states/api';
import { Store } from '@reduxjs/toolkit';
import { ws } from 'src/ws/websocket';

export default (store: Store) => (next: any) => async (action: any) => {
  if (action.type !== actions.wsCallBegan.type) return next(action);

  const { data, event } = action.payload;

  next(action);

  const unsub = () => {
    ws.off(event, wrapperCallback);
    ws.off('error', errorCallback);
  };

  const wrapperCallback = (payload: any) => {
    unsub();
    store.dispatch(
      actions.wsCallSucceded({
        event,
        payload
      })
    );
  };

  const errorCallback = (payload: any) => {
    unsub();
    store.dispatch(
      actions.wsCallFailed({
        event,
        payload
      })
    );
  };

  ws.on(event, wrapperCallback);
  ws.on('error', errorCallback);

  ws.emit(event, data);
};
