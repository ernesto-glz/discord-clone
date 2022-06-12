import client from '../client';

export interface CreateRoom {
  receiverId: string;
}

export const getOrCreateRoom = (
  controller: AbortController,
  data: CreateRoom
) => {
  return client.post('/room/create-room', data, { signal: controller.signal });
};

export const getDMChannels = () => {
  return client.get('/room/get-all');
};

export const getChannelById = (roomId: string) => {
  return client.get(`/room/${roomId}`);
};
