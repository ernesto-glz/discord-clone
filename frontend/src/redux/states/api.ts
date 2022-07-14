import { WS } from '@discord/types';
import { createAction } from '@reduxjs/toolkit';

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
