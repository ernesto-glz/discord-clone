import { CreateFriendRequest } from 'src/models/friend.model';
import client from '../client';

interface WithExtraInfo {
  extraInfo: boolean;
}

export const createFriendRequest = (
  data: CreateFriendRequest,
  controller: AbortController
) => {
  return client.post('/friend/create-request', data, {
    signal: controller.signal
  });
};

export const getPendingRequests = (controller: AbortController) => {
  return client.get('/friend/pending-requests', { signal: controller.signal });
};

export const getOutgoingRequests = (controller: AbortController) => {
  return client.get('/friend/outgoing-requests', { signal: controller.signal });
};

export const deleteFriendRequest = (
  requestId: string,
  controller: AbortController
) => {
  return client.delete(`/friend/${requestId}`, { signal: controller.signal });
};

export const acceptFriendRequest = (
  requestId: string,
  controller: AbortController
) => {
  return client.put(`/friend/accept/${requestId}`, {
    controller: controller.signal
  });
};

export const getFriends = ({ extraInfo }: WithExtraInfo) => {
  return client.get(`/friend/my-friends?extraInfo=${extraInfo}`);
};
