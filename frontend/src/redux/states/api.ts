import { WS } from '@discord/types';
import { createAction, Dispatch } from '@reduxjs/toolkit';

export interface APIArgs {
  data?: object;
  headers?: object;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  onSuccess?: string[];
  url: string;
  callback?: (payload: any) => any | Promise<any>;
  errorCallback?: (data: any) => any;
}

export interface WSArgs {
  data?: object;
  event: keyof WS.To;
}

export const actions = {
  restCallBegan: createAction<APIArgs>('api/restCallBegan'),
  restCallSucceded: createAction<{}>('api/restCallSucceeded'),
  restCallFailed: createAction<{}>('api/restCallFailed'),
  wsCallBegan: createAction<WSArgs>('api/wsCallBegan'),
  wsCallSucceded: createAction<{}>('api/wsCallSucceeded'),
  wsCallFailed: createAction<{}>('api/wsCallFailed')
};

type Args = { hash: string, url: string };
export const uploadFile = (file: File, callback?: (args: Args) => any) => (dispatch: Dispatch) => {
  const formData = new FormData();
  formData.append('file', file);

  dispatch(actions.restCallBegan({
    method: 'post',
    url: '/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    callback,
  }));
}
