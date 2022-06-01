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

export const getAllRooms = (controller: AbortController) => {
  return client.get('/room/get-all', { signal: controller.signal });
};

export const getRoomById = (controller: AbortController, roomId: string) => {
  return client.get(`/room/${roomId}`, { signal: controller.signal });
};
