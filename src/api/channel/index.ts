import { AddChannel } from 'src/redux/states/channels';
import client from '../client';

export const getOrCreateChannel = (data: AddChannel) => {
  return client.post('/channel/create', data);
};

export const getChannels = () => {
  return client.get('/channel/get');
};

export const getChannelById = (channelId: string) => {
  return client.get(`/channel/${channelId}`);
};
