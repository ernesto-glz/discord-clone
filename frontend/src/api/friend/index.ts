import { CreateFriendRequest } from 'src/models/friend.model';
import client from '../client';

export const createFriendRequest = (
  data: CreateFriendRequest,
  controller: AbortController
) => client.post('/friend/create-request', data, { signal: controller.signal });

export const getPendingRequests = (controller: AbortController) =>
  client.get('/friend/pending-requests', { signal: controller.signal });

export const getOutgoingRequests = (controller: AbortController) =>
  client.get('/friend/outgoing-requests', { signal: controller.signal });

export const deleteFriendRequest = (
  requestId: string,
  controller: AbortController
) => client.delete(`/friend/${requestId}`, { signal: controller.signal });

export const acceptFriendRequest = (
  requestId: string,
  controller: AbortController
) =>
  client.put(`/friend/accept/${requestId}`, {
    controller: controller.signal
  });

export const getFriends = (controller: AbortController, extraInfo: boolean) => {
  return client.get(`/friend/my-friends?extraInfo=${extraInfo}`, {
    signal: controller.signal
  });
};
