import client from '../client';

export const getUserInfo = (userId: string, controller: AbortController) => {
  return client.get(`/user/${userId}`, { signal: controller.signal });
};
