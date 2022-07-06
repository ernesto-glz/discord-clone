import { Store } from '@reduxjs/toolkit';
import client from 'src/api/client';
import { getHeaders } from 'src/utils/rest';
import { actions, APIArgs } from '../states/api';

export default (store: Store) => (next: any) => async (action: any) => {
  if (action.type !== actions.restCallBegan.type) return next(action);

  const { url, method, data, onSuccess, callback } = action.payload as APIArgs;

  next(action);

  try {
    const { data: payload } = await client.request({
      data,
      method,
      url,
      headers: getHeaders()
    });

    store.dispatch(actions.restCallSucceded({ url, response: payload }));
    if (onSuccess)
      for (const type of onSuccess) store.dispatch({ type, payload });

    if (callback) await callback(payload);
  } catch (error) {
    console.log(error);
    const response = (error as any).response;
    store.dispatch(actions.restCallFailed({ url, response }));

    console.log(response?.data?.message ?? 'Unknown Error');
  }
};
