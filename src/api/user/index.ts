import client from '../client';

export const getUserInfo = (userId: string, controller: AbortController) =>
  client.get(`/user/${userId}`, { signal: controller.signal });
