import { CreateFriendRequest } from 'src/models/friend.model';
import client from '../client';

export const createFriendRequest = (
  data: CreateFriendRequest,
  controller: AbortController
) => {
  return client.post('/friends/create-request', data, {
    signal: controller.signal
  });
};

export const deleteFriendRequest = (
  requestId: string,
  controller: AbortController
) => {
  return client.delete(`/friends/${requestId}`, { signal: controller.signal });
};

export const acceptFriendRequest = (
  requestId: string,
  controller: AbortController
) => {
  return client.put(`/friends/accept/${requestId}`, {
    controller: controller.signal
  });
};