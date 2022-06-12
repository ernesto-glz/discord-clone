import { CreateMessage } from 'src/models/message.model';
import client from '../client';

export const createMessage = (
  data: CreateMessage,
  controller: AbortController
) => client.post('/message/create', data, { signal: controller.signal });

export const getAllMessages = (roomId: string, page?: number) => {
  if (page) {
    return client.get(`/message/get/${roomId}?page=${page}`);
  }
  return client.get(`/message/get/${roomId}`);
};
