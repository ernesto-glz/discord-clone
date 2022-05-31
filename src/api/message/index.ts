import { CreateMessage } from 'src/models/message.model';
import client from '../client';

export const createMessage = (
  data: CreateMessage,
  controller: AbortController
) => client.post('/message/create', data, { signal: controller.signal });

export const getAllMessages = (
  roomId: string,
  controller: AbortController,
  page?: number
) => {
  if (page) {
    return client.get(`/message/get/${roomId}?page=${page}`, {
      signal: controller.signal
    });
  }
  return client.get(`/message/get/${roomId}`, { signal: controller.signal });
};
