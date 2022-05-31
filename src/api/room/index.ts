import client from '../client';

export interface CreateRoom {
  receiverId: string;
}

export const getOrCreateRoom = (
  controller: AbortController,
  data: CreateRoom
) => client.post('/room/create-room', data, { signal: controller.signal });

export const getAllRooms = (controller: AbortController) =>
  client.get('/room/get-all', { signal: controller.signal });
