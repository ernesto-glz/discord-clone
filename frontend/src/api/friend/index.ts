import { CreateFriendRequest } from 'src/models/friend.model';
import client from '../client';

export const createFriendRequest = (
  data: CreateFriendRequest,
  controller: AbortController
) => {
  return client.post('/friends', data, {
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
  return client.put(`/friends/${requestId}`, {
    controller: controller.signal
  });
};