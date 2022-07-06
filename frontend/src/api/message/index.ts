import { CreateMessage } from 'src/models/message.model';
import client from '../client';

export const createMessage = (
  data: CreateMessage,
  controller: AbortController
) => client.post('/messages', data, { signal: controller.signal });

export const getMessages = (channelId: string, page?: number) => {
  if (page) {
    return client.get(`/channels/${channelId}/messages?page=${page}`);
  }
  return client.get(`/channels/${channelId}/messages`);
};
